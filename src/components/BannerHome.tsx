"use client";

import { MediaItem, Movie, TVShow } from "@/lib/tmdb/types";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const bannerBlurDataURL =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23131313'/%3E%3Cstop offset='1' stop-color='%23252525'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E";

interface BannerHomeProps {
  data: MediaItem[];
}

const BannerHome = ({ data }: BannerHomeProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const [loadedBackdropKey, setLoadedBackdropKey] = useState<string | null>(
    null,
  );

  // Filter valid items for the carousel (limit to top 10)
  const validItems = useMemo(
    () =>
      data
        .filter(
          (item): item is Movie | TVShow =>
            item.media_type === "movie" || item.media_type === "tv",
        )
        .slice(0, 10),
    [data],
  );

  const nextBanner = useCallback(() => {
    setCurrentIdx((prev) => (prev === validItems.length - 1 ? 0 : prev + 1));
  }, [validItems.length]);

  const prevBanner = useCallback(() => {
    setCurrentIdx((prev) => (prev === 0 ? validItems.length - 1 : prev - 1));
  }, [validItems.length]);

  const resetAutoplayTimer = useCallback(() => {
    setAutoplayResetKey((prev) => prev + 1);
  }, []);

  const handleNextClick = useCallback(() => {
    nextBanner();
    resetAutoplayTimer();
  }, [nextBanner, resetAutoplayTimer]);

  const handlePrevClick = useCallback(() => {
    prevBanner();
    resetAutoplayTimer();
  }, [prevBanner, resetAutoplayTimer]);

  const handleDotClick = useCallback(
    (idx: number) => {
      setCurrentIdx(idx);
      resetAutoplayTimer();
    },
    [resetAutoplayTimer],
  );

  // Auto-play the banner every 8 seconds
  useEffect(() => {
    if (validItems.length === 0) return;
    const timer = setInterval(nextBanner, 8000);
    return () => clearInterval(timer);
  }, [nextBanner, validItems.length, autoplayResetKey]);

  if (validItems.length === 0) return null;

  const bannerItem = validItems[currentIdx];
  const isMovie = bannerItem.media_type === "movie";

  const title = isMovie ? bannerItem.title : bannerItem.name;
  const rating = bannerItem.vote_average?.toFixed(1) ?? "0.0";
  const year = isMovie
    ? bannerItem.release_date?.split("-")[0]
    : bannerItem.first_air_date?.split("-")[0];
  const backdrop = bannerItem.backdrop_path;
  const backdropSize = "original";
  const currentBackdropKey = `${bannerItem.id}-${backdropSize}`;
  const overview = bannerItem.overview;
  const isBackdropLoaded = loadedBackdropKey === currentBackdropKey;

  return (
    <section className="group/banner relative h-[72vh] w-full min-h-120 overflow-hidden bg-background md:h-[85vh] md:min-h-150">
      {/* Background Hero Image with Motion Presence */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {backdrop && (
          <div
            key={bannerItem.id}
            className="absolute inset-0 h-full w-full transition-opacity duration-300"
          >
            {!isBackdropLoaded && (
              <div className="absolute inset-0 bg-zinc-900">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/8 to-transparent" />
              </div>
            )}

            <Image
              src={`https://image.tmdb.org/t/p/${backdropSize}${backdrop}`}
              alt={title ?? "Hero Banner"}
              fill
              placeholder="blur"
              blurDataURL={bannerBlurDataURL}
              onLoad={() => setLoadedBackdropKey(currentBackdropKey)}
              priority
              loading="eager"
              quality={100}
              sizes="100vw"
              className={`object-cover opacity-50 transition-[filter,transform,opacity] duration-500 ${
                isBackdropLoaded
                  ? "blur-0 scale-100 opacity-50"
                  : "blur-xl scale-105 opacity-20"
              }`}
            />
          </div>
        )}

        {/* Layered Cinematic Gradients (Tailwind v4 syntax) */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/30 to-transparent z-10" />
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-between px-6 opacity-0 transition-opacity duration-300 group-hover/banner:opacity-100">
        <button
          onClick={handlePrevClick}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xl border border-zinc-500/10 transition-all hover:bg-brand-primary hover:text-black active:scale-90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNextClick}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xl border border-zinc-500/10 transition-all hover:bg-brand-primary hover:text-black active:scale-90"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Hero Content Area */}
      <div className="container relative z-30 mx-auto flex h-full flex-col justify-end px-4 pt-24 pb-20 md:pt-28 md:pb-32 lg:px-8">
        <div className="max-w-4xl">
          <div key={bannerItem.id} className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-4 py-1.5 text-brand-primary ring-1 ring-brand-primary/40 backdrop-blur-md">
                <TrendingUp className="h-3.5 w-3.5" />
                Trending {isMovie ? "Movie" : "Series"}
              </span>
              {rating !== "0.0" && (
                <span className="flex items-center gap-1.5 rounded-full bg-brand-secondary/10 px-4 py-1.5 text-brand-secondary ring-1 ring-brand-secondary/40 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {rating} Rating
                </span>
              )}
              {year && (
                <span className="rounded-full bg-zinc-900/50 px-4 py-1.5 text-zinc-400 ring-1 ring-zinc-500/10 backdrop-blur-md">
                  {year}
                </span>
              )}
            </div>

            {/* Title with staggered textreveal feel */}
            <h1 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>

            {/* Description */}
            <p className="line-clamp-3 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300/90 md:text-xl">
              {overview}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link
                href={`/${bannerItem.media_type}/${bannerItem.id}`}
                className="group flex items-center gap-3 rounded-full bg-brand-primary px-10 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-105 hover:shadow-brand-primary/40 active:scale-95 lg:px-12"
              >
                <Play className="h-6 w-6 fill-current transition-transform group-hover:scale-110" />
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        {validItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className="group relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/10 transition-all duration-500"
            style={{ width: idx === currentIdx ? "2rem" : "0.75rem" }}
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className="absolute left-0 bottom-0 top-0 h-full rounded-full bg-brand-primary transition-all duration-500"
              style={{
                width: idx === currentIdx ? "100%" : "0%",
                opacity: idx === currentIdx ? 1 : 0,
              }}
            />
          </button>
        ))}
      </div>

      {/* Bottom fade for content transition */}
      <div className="absolute -bottom-1 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default BannerHome;
