"use client";

import { fetchDiscoverMedia } from "@/app/actions";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import { useInfinitePagination } from "@/hooks/use-infinite-pagination";
import { MediaItem, TMDBResponse } from "@/lib/tmdb/types";
import { useCallback, useMemo } from "react";

interface ExploreContentProps {
  type: string;
  initialData: TMDBResponse<MediaItem>;
}

export default function ExploreContent({
  type,
  initialData,
}: ExploreContentProps) {
  const fetchDiscoverPage = useCallback(
    (nextPage: number) => fetchDiscoverMedia(type, nextPage),
    [type],
  );

  const { items, isLoadingMore, hasMore, loadMoreRef } =
    useInfinitePagination<MediaItem>({
      initialData,
      fetchPage: fetchDiscoverPage,
      resetKey: type,
    });

  const displayItems = useMemo(
    () =>
      items.filter((item) => item.media_type !== "person" && item.poster_path),
    [items],
  );

  const displayTitle = type === "movie" ? "Movies" : "TV Shows";

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
        Popular <span className="text-brand-primary">{displayTitle}</span>
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-6">
        {displayItems.map((item, index) => (
          <div
            key={`${item.media_type ?? "media"}-${item.id}`}
            className="aspect-2/3 w-full"
          >
            <Card
              data={item}
              mediaType={type as "movie" | "tv"}
              index={index + 1}
            />
          </div>
        ))}

        {/* Loading Skeletons */}
        {isLoadingMore &&
          Array.from({ length: 12 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="aspect-2/3 w-full">
              <CardSkeleton />
            </div>
          ))}
      </div>

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="flex h-20 w-full items-center justify-center"
        >
          {isLoadingMore ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-brand-primary" />
          ) : null}
        </div>
      )}
    </div>
  );
}
