import Link from 'next/link';
import { blog } from '@/lib/source';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export default function Page() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime(),
  );

  const [featured, ...rest] = posts;

  const noiseSvg = `<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>`;

  return (
    <main className="mx-auto w-full max-w-fd-container px-4 md:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-fd-card to-fd-background p-8 md:p-12">
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wide text-fd-muted-foreground">Blog</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">Thoughts, Notes, and Updates</h1>
          <p className="mt-3 max-w-2xl text-fd-muted-foreground">
            简洁而高级的记录，沉淀有价值的观点与灵感。
          </p>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage: [
              'radial-gradient(600px 200px at 60% -10%, rgba(190,0,255,0.20), transparent)',
              'radial-gradient(500px 240px at -10% 80%, rgba(50,150,255,0.18), transparent)',
              `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`,
            ].join(', '),
            backgroundRepeat: 'no-repeat',
          }}
        />
      </section>

      {/* Featured Post */}
      {featured && (
        <Link
          key={featured.url}
          href={featured.url}
          className="group mt-8 block overflow-hidden rounded-xl border bg-fd-card p-8 transition-colors hover:bg-fd-accent"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(featured.data.date ?? featured.file.name).toDateString()}</span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight md:text-3xl md:leading-snug group-hover:underline">
                {featured.data.title}
              </h2>
              {featured.data.description ? (
                <p className="mt-3 text-fd-muted-foreground">
                  {featured.data.description}
                </p>
              ) : null}
            </div>
            <div className="mt-2 md:mt-0">
              <span
                className={cn(
                  buttonVariants({ variant: 'grow', size: 'lg' }),
                  'inline-flex items-center gap-2'
                )}
              >
                阅读 <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group flex flex-col overflow-hidden rounded-xl border bg-fd-card p-5 transition-colors hover:bg-fd-accent"
          >
            <div className="flex items-center gap-2 text-xs text-fd-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(post.data.date ?? post.file.name).toDateString()}</span>
            </div>
            <p className="mt-2 text-lg font-medium group-hover:underline">
              {post.data.title}
            </p>
            {post.data.description ? (
              <p className="mt-2 text-sm text-fd-muted-foreground">
                {post.data.description}
              </p>
            ) : null}
            <div className="mt-6 flex items-center justify-end text-sm">
              <span className="inline-flex items-center gap-1 text-fd-foreground/80">
                阅读 <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}