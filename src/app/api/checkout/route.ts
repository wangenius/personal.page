import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

const PLAN_CONFIG = {
  monthly: {
    priceEnv: "STRIPE_PRICE_MONTHLY",
    mode: "subscription",
  },
  yearly: {
    priceEnv: "STRIPE_PRICE_YEARLY",
    mode: "subscription",
  },
  lifetime: {
    priceEnv: "STRIPE_PRICE_LIFETIME",
    mode: "payment",
  },
} as const;

type PlanKey = keyof typeof PLAN_CONFIG;

const FALLBACK_SUCCESS_PATH = "/subscription?status=success&session_id={CHECKOUT_SESSION_ID}";
const FALLBACK_CANCEL_PATH = "/subscription?status=cancelled";

const resolveBaseUrl = () =>
  process.env.STRIPE_CHECKOUT_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  "http://localhost:3000";

const resolveSuccessUrl = () =>
  process.env.STRIPE_CHECKOUT_SUCCESS_URL || `${resolveBaseUrl()}${FALLBACK_SUCCESS_PATH}`;

const resolveCancelUrl = () =>
  process.env.STRIPE_CHECKOUT_CANCEL_URL || `${resolveBaseUrl()}${FALLBACK_CANCEL_PATH}`;

const isPlanKey = (plan: string): plan is PlanKey => plan in PLAN_CONFIG;

export async function GET(request: NextRequest) {
  const plan = request.nextUrl.searchParams.get("plan");

  if (!plan || !isPlanKey(plan)) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }

  const config = PLAN_CONFIG[plan];
  const priceId = process.env[config.priceEnv];

  if (!priceId) {
    console.error(`Missing Stripe price env: ${config.priceEnv}`);
    return NextResponse.json({ error: "Plan unavailable." }, { status: 500 });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    console.error("Stripe is not configured.", error);
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: resolveSuccessUrl(),
      cancel_url: resolveCancelUrl(),
      metadata: {
        plan,
      },
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error("Stripe Checkout did not return a URL.");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe checkout session error.", error);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 500 });
  }
}
