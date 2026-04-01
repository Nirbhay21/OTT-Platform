"use client";

const BannerSkeleton = () => {
  return (
    <section className="relative h-[85vh] w-full min-h-150 overflow-hidden bg-zinc-950">
      {/* Background Skeleton */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-zinc-900" />
        {/* Gradients to match the real banner overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/30 to-transparent z-10" />
      </div>

      {/* Hero Content Area Skeleton */}
      <div className="container relative z-30 mx-auto flex h-full flex-col justify-end px-4 pt-24 pb-20 md:pt-28 md:pb-32 lg:px-8">
        <div className="max-w-4xl space-y-6">
          {/* Badges Skeleton */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative h-8 w-40 overflow-hidden rounded-full bg-zinc-800/50">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-8 w-24 overflow-hidden rounded-full bg-zinc-800/50">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-8 w-20 overflow-hidden rounded-full bg-zinc-800/50">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-3">
            <div className="relative h-12 w-3/4 overflow-hidden rounded-2xl bg-zinc-800/50 md:h-14 lg:h-16 xl:h-20">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-12 w-1/2 overflow-hidden rounded-2xl bg-zinc-800/50 md:h-14 lg:h-16 xl:h-20">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="relative h-4 w-full overflow-hidden rounded bg-zinc-800/30">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded bg-zinc-800/30">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-4 w-2/3 overflow-hidden rounded bg-zinc-800/30">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-wrap items-center gap-5 pt-4">
            <div className="relative h-14 w-44 overflow-hidden rounded-full bg-zinc-800/50">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators Skeleton */}
      <div className="absolute bottom-12 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="relative h-1.5 overflow-hidden rounded-full bg-zinc-800/50"
            style={{ width: i === 0 ? "2rem" : "0.75rem" }}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute -bottom-1 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default BannerSkeleton;
