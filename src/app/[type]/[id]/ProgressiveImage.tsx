"use client";

import Image from "next/image";
import { useState } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  blurDataURL: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function ProgressiveImage({
  src,
  alt,
  className,
  blurDataURL,
  priority,
  quality,
  sizes,
  loading,
  fill,
  width,
  height,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const transitionClasses = `${className ?? ""} transition-[filter,transform] duration-700 ${
    isLoaded ? "blur-0 scale-100" : "blur-xl scale-105"
  }`;

  if (fill) {
    return (
      <>
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-900">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/8 to-transparent" />
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          quality={quality}
          sizes={sizes ?? "100vw"}
          loading={loading ?? (priority ? "eager" : "lazy")}
          decoding="async"
          className={transitionClasses}
        />
      </>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 500}
      height={height ?? 750}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onLoad={() => setIsLoaded(true)}
      priority={priority}
      quality={quality}
      sizes={sizes ?? "(max-width: 768px) 70vw, 500px"}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding="async"
      className={transitionClasses}
    />
  );
}
