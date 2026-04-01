"use client";

import { TMDBResponse } from "@/lib/tmdb/types";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfinitePaginationOptions<T extends { id: number }> {
  initialData: TMDBResponse<T>;
  fetchPage: (page: number) => Promise<TMDBResponse<T>>;
  resetKey: string;
  enabled?: boolean;
  threshold?: number;
}

export function useInfinitePagination<T extends { id: number }>({
  initialData,
  fetchPage,
  resetKey,
  enabled = true,
  threshold = 0.1,
}: UseInfinitePaginationOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData.results);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(
    initialData.page < initialData.total_pages,
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    requestIdRef.current += 1;
    setItems(initialData.results);
    setPage(1);
    setHasMore(initialData.page < initialData.total_pages);
    setIsLoadingMore(false);
    setLoadError(null);
  }, [initialData, resetKey]);

  const loadMoreItems = useCallback(async () => {
    if (!enabled || isLoadingMore || !hasMore) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoadingMore(true);
    setLoadError(null);

    try {
      const nextPage = page + 1;
      const res = await fetchPage(nextPage);

      if (requestId !== requestIdRef.current) return;

      if (res.results) {
        setItems((prev) => {
          const prevIds = new Set(prev.map((item) => item.id));
          const newItems = res.results.filter((item) => !prevIds.has(item.id));
          return [...prev, ...newItems];
        });
        setPage(nextPage);
        setHasMore(nextPage < res.total_pages);
      }
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      setLoadError("Unable to load more content. Please try again.");
      console.error("Infinite pagination failed", error);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoadingMore(false);
      }
    }
  }, [enabled, fetchPage, hasMore, isLoadingMore, page]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !enabled) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold },
    );

    observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enabled, loadMoreItems, threshold]);

  return {
    items,
    isLoadingMore,
    loadError,
    hasMore,
    loadMoreRef,
    retryLoadMore: loadMoreItems,
  };
}
