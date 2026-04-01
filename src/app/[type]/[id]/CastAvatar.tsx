"use client";

import { User, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const castBlurDataURL =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23363636'/%3E%3C/svg%3E";

interface CastAvatarProps {
  src?: string | null;
  alt: string;
  variant?: "user" | "users";
  imageClassName?: string;
  sizes?: string;
}

export default function CastAvatar({
  src,
  alt,
  variant = "user",
  imageClassName,
  sizes,
}: CastAvatarProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!src) {
    return (
      <div className="flex h-full items-center justify-center bg-linear-to-br from-zinc-700/30 to-zinc-800/70 text-zinc-400">
        {variant === "users" ? <Users size={24} /> : <User size={32} />}
      </div>
    );
  }

  return (
    <>
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-zinc-900">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={castBlurDataURL}
        onLoad={() => setIsImageLoaded(true)}
        sizes={sizes ?? "96px"}
        loading="lazy"
        decoding="async"
        className={`${imageClassName ?? "object-cover"} transition-[filter,transform,opacity] duration-500 ${
          isImageLoaded
            ? "blur-0 opacity-100 scale-100"
            : "blur-md opacity-80 scale-105"
        }`}
      />
    </>
  );
}
