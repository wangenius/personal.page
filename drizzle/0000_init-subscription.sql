CREATE TABLE "subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"plan" text NOT NULL,
	"status" text NOT NULL,
	"gateway" text DEFAULT 'stripe' NOT NULL,
	"stripeCustomerId" text,
	"stripeSubscriptionId" text,
	"stripeCheckoutSessionId" text NOT NULL,
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_stripeCheckoutSessionId_unique" UNIQUE("stripeCheckoutSessionId")
);
--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
