"use client";

const CardSkeleton = () => {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 shadow-lg">
      {/* Poster area skeleton */}
      <div className="relative h-full w-full bg-zinc-800">
        {/* Shimmer effect */}
        <div className="absolute inset-0 z-10 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent shadow-[0_0_40px_rgba(255,255,255,0.05)]" />

        {/* Placeholder bottom info */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-linear-to-t from-black via-black/90 to-transparent p-4 space-y-3 transition-transform duration-300 group-hover:translate-y-0">
          {/* Title line 1 */}
          <div className="h-4 w-3/4 rounded-full bg-zinc-700/50" />
          {/* Title line 2 */}
          <div className="h-4 w-1/2 rounded-full bg-zinc-700/50" />

          <div className="flex items-center justify-between pt-2">
            {/* Rating */}
            <div className="h-3 w-10 rounded-full bg-zinc-700/50" />
            {/* Year */}
            <div className="h-3 w-8 rounded-full bg-zinc-700/50" />
          </div>

          <div className="pt-2">
            {/* Badge */}
            <div className="h-5 w-16 rounded-sm bg-zinc-700/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
