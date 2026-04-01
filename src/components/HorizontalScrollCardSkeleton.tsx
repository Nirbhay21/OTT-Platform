"use client";

import CardSkeleton from "./CardSkeleton";

interface HorizontalScrollCardSkeletonProps {
  heading?: string;
  title?: string;
}

const HorizontalScrollCardSkeleton = ({
  heading,
  title,
}: HorizontalScrollCardSkeletonProps) => {
  const displayTitle = heading || title;
  return (
    <section className="container mx-auto py-2 px-4 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {displayTitle ? (
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white md:text-3xl lg:text-4xl">
                {displayTitle}
              </h2>
            ) : (
              <div className="h-10 w-48 animate-pulse rounded-md bg-zinc-900" />
            )}
            <div className="h-1 w-12 rounded-full bg-brand-primary" />
          </div>

          {/* Navigation Buttons Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full border border-zinc-500/10 bg-zinc-900" />
            <div className="h-10 w-10 animate-pulse rounded-full border border-zinc-500/10 bg-zinc-900" />
          </div>
        </div>

        <div className="group relative isolate">
          <div className="no-scrollbar flex gap-6 overflow-x-hidden px-1 py-2">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="h-87 w-58 shrink-0">
                <CardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCardSkeleton;
