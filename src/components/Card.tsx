"use client";

import { MediaItem, Movie, TVShow } from "@/lib/tmdb/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardClientWrapper } from "./CardClientWrapper";

const posterBlurDataURL =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 15'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%231a1a1a'/%3E%3Cstop offset='1' stop-color='%23333333'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='10' height='15' fill='url(%23g)'/%3E%3C/svg%3E";

interface CardProps {
  data: MediaItem;
  mediaType?: "movie" | "tv";
  index?: number;
  trending?: boolean;
}

const Card = ({ data, mediaType, index, trending }: CardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (data.media_type === "person") return null;

  // Narrowing the type to get common fields
  const title = (data as Movie).title || (data as TVShow).name || "Untitled";
  const posterPath = data.poster_path;
  const releaseDate =
    (data as Movie).release_date || (data as TVShow).first_air_date;
  const voteAverage = data.vote_average?.toFixed(1) ?? "0.0";
  const id = data.id;
  const resolvedMediaType =
    data.media_type === "movie" || data.media_type === "tv"
      ? data.media_type
      : mediaType;

  if (!posterPath || !resolvedMediaType) return null;

  return (
    <CardClientWrapper>
      <Link
        href={`/${resolvedMediaType}/${id}`}
        className="relative block h-full w-full"
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-zinc-900">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/8 to-transparent" />
          </div>
        )}

        <Image
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          fill
          placeholder="blur"
          blurDataURL={posterBlurDataURL}
          onLoad={() => setIsImageLoaded(true)}
          priority={index !== undefined && index <= 6}
          loading={index !== undefined && index <= 6 ? "eager" : "lazy"}
          quality={70}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 232px"
          className={`object-cover transition-[filter,transform,opacity] duration-500 ${
            isImageLoaded
              ? "blur-0 scale-100 opacity-100"
              : "blur-xl scale-105 opacity-70"
          } group-hover:opacity-40`}
        />

        {/* Trending Badge */}
        {trending && index !== undefined && (
          <div className="absolute top-0 left-0 z-10 rounded-br-2xl bg-brand-primary px-4 py-1.5 text-xs font-black text-black shadow-lg">
            #{index} Trending
          </div>
        )}

        {/* Hover Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-linear-to-t from-black via-black/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="line-clamp-2 text-sm font-bold text-white mb-2 uppercase tracking-wide">
            {title}
          </h3>

          <div className="flex items-center justify-between text-[10px] font-black uppercase text-zinc-400">
            <span className="flex items-center gap-1 text-brand-secondary">
              <Star className="h-3 w-3 fill-current" />
              {voteAverage}
            </span>
            <span>{releaseDate?.split("-")[0]}</span>
          </div>

          <div className="mt-3 flex gap-2">
            <div className="rounded-sm bg-brand-primary/20 px-2 py-px text-xs text-brand-primary ring-1 ring-brand-primary/30">
              {resolvedMediaType}
            </div>
          </div>
        </div>
      </Link>
    </CardClientWrapper>
  );
};

export default Card;
