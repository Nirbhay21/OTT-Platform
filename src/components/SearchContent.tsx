"use client";

import { fetchSearchResults } from "@/app/actions";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useInfinitePagination } from "@/hooks/use-infinite-pagination";
import { MediaItem, TMDBResponse } from "@/lib/tmdb/types";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SearchContentProps {
  query: string;
  initialData: TMDBResponse<MediaItem>;
}

export default function SearchContent({
  query,
  initialData,
}: SearchContentProps) {
  const router = useRouter();
  const pageSearchInputRef = useRef<HTMLInputElement>(null);
  const [isPageInputFocused, setIsPageInputFocused] = useState(false);

  const [searchInput, setSearchInput] = useState(query);
  const debouncedSearch = useDebounce(searchInput, 500);

  const fetchSearchPage = useCallback(
    (nextPage: number) => fetchSearchResults(query, nextPage),
    [query],
  );

  const {
    items,
    isLoadingMore,
    loadError,
    hasMore,
    loadMoreRef,
    retryLoadMore,
  } = useInfinitePagination<MediaItem>({
    initialData,
    fetchPage: fetchSearchPage,
    resetKey: query,
    enabled: Boolean(query),
  });

  useEffect(() => {
    if (!isPageInputFocused) return;

    const currentUrlQuery =
      new URLSearchParams(window.location.search).get("q") || "";
    const normalizedDebouncedSearch = debouncedSearch.trim();
    const normalizedCurrentUrlQuery = currentUrlQuery.trim();

    if (normalizedDebouncedSearch === normalizedCurrentUrlQuery) return;

    if (normalizedDebouncedSearch) {
      router.replace(
        `/search?q=${encodeURIComponent(normalizedDebouncedSearch)}`,
      );
    } else if (debouncedSearch === "") {
      router.replace("/search");
    }
  }, [debouncedSearch, isPageInputFocused, router]);

  const inputValue = isPageInputFocused ? searchInput : query;

  const displayItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.media_type !== "person" &&
          item.poster_path &&
          (item.media_type === "movie" || item.media_type === "tv"),
      ),
    [items],
  );

  return (
    <div className="flex flex-col space-y-6">
      {/* Mobile Search Input - Only shown on mobile since header already has it for desktop */}
      <div className="sticky top-20 z-30 mx-auto w-full max-w-md lg:hidden">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-brand-primary" />
          <input
            ref={pageSearchInputRef}
            type="text"
            placeholder="Search for movies, TV shows..."
            value={inputValue}
            onFocus={() => {
              setIsPageInputFocused(true);
              setSearchInput(query);
            }}
            onBlur={() => setIsPageInputFocused(false)}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 pl-4 pr-10 py-2.5 text-base text-white backdrop-blur-xl focus:border-brand-primary/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20 shadow-xl"
            autoFocus
          />
        </div>
      </div>

      {query ? (
        <>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
            Search Results for{" "}
            <span className="text-brand-primary">&quot;{query}&quot;</span>
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
              <p className="text-xl font-medium text-white mb-2">
                No results found
              </p>
              <p className="text-sm">
                We couldn&apos;t find any movies or TV shows matching your
                search.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-6">
                {displayItems.map((item, index) => (
                  <div
                    key={`${item.media_type ?? "media"}-${item.id}`}
                    className="aspect-2/3 w-full"
                  >
                    <Card data={item} index={index + 1} />
                  </div>
                ))}

                {/* Loading Skeletons */}
                {isLoadingMore &&
                  Array.from({ length: 6 }).map((_, i) => (
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

              {loadError && (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <p className="text-sm text-red-300">{loadError}</p>
                  <button
                    onClick={retryLoadMore}
                    className="rounded-md border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                  >
                    Retry
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-6 rounded-full bg-white/5 p-8 text-white/20">
            <Search className="h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Search for Content
          </h2>
          <p className="max-w-xs text-muted-foreground">
            Enter a movie or TV show name to start exploring our library.
          </p>
        </div>
      )}
    </div>
  );
}
