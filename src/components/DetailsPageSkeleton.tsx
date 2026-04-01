"use client";

const BackdropSkeleton = () => (
  <div className="fixed inset-0 z-0 h-[60vh] w-full lg:h-screen pointer-events-none">
    <div className="relative h-full w-full bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
    {/* Cinematic Gradient Masking */}
    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
    <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-zinc-950/20" />
  </div>
);

const PosterSkeleton = () => (
  <div className="mx-auto w-full max-w-55 sm:max-w-65 lg:mx-0 lg:max-w-none lg:col-span-4">
    <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl relative w-full aspect-2/3">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
    </div>
  </div>
);

const TextContentSkeleton = () => (
  <div className="flex flex-col space-y-6 lg:col-span-8 w-full">
    <div className="space-y-3">
      {/* Category Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="h-4 w-32 rounded bg-zinc-800/80 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>

      {/* Title */}
      <div className="h-12 w-3/4 rounded-lg bg-zinc-800 relative overflow-hidden md:h-14 lg:h-14">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Tagline */}
      <div className="h-6 w-1/2 rounded bg-zinc-800/60 relative overflow-hidden mt-2">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Key Metadata Stats */}
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <div className="h-8 w-32 rounded-lg bg-zinc-800/80 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <div className="h-4 w-16 rounded bg-zinc-800/60 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <div className="h-4 w-16 rounded bg-zinc-800/60 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>

      {/* Genres */}
      <div className="flex items-center gap-4 mt-4">
        <div className="h-4 w-16 rounded bg-zinc-800/60 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-20 rounded-md bg-zinc-800/60 relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap items-center gap-4 pt-1">
      <div className="h-12 w-60 rounded-full bg-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>

    {/* Content Divider */}
    <div className="h-px w-full bg-linear-to-r from-white/5 to-transparent my-4" />

    {/* Overview Section */}
    <div className="max-w-3xl space-y-2">
      <div className="h-3 w-20 rounded bg-zinc-800/60 relative overflow-hidden mb-2">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="space-y-3">
        <div className="h-5 w-full rounded bg-zinc-800/40 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <div className="h-5 w-full rounded bg-zinc-800/40 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <div className="h-5 w-2/3 rounded bg-zinc-800/40 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>
    </div>

    {/* Key Personnel */}
    <div className="grid grid-cols-1 gap-6 py-1 md:grid-cols-3 mt-4">
      <div className="space-y-1">
        <div className="h-3 w-16 rounded bg-zinc-800/60 relative overflow-hidden" />
        <div className="h-5 w-32 rounded bg-zinc-800/80 relative overflow-hidden" />
      </div>
      <div className="col-span-2 space-y-1">
        <div className="h-3 w-16 rounded bg-zinc-800/60 relative overflow-hidden" />
        <div className="h-5 w-48 rounded bg-zinc-800/80 relative overflow-hidden" />
      </div>
    </div>

    {/* Cast Row Section Skeleton */}
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-zinc-800/60 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="relative aspect-square w-24 overflow-hidden rounded-full bg-zinc-800 border border-white/5">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
            </div>
            <div className="h-3 w-16 rounded bg-zinc-800/60 relative overflow-hidden mt-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DetailsPageSkeleton = () => {
  return (
    <main aria-busy="true" role="status" className="min-h-screen bg-zinc-950">
      <span className="sr-only">Loading content details...</span>

      <BackdropSkeleton />

      {/* Match DetailsContent Container padding exactly */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-[10vh] pb-12 xl:pt-[12vh]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <PosterSkeleton />
          <TextContentSkeleton />
        </div>
      </div>
    </main>
  );
};

export default DetailsPageSkeleton;
