"use client";

import { TMDBVideo } from "@/lib/tmdb/types";
import { Loader2, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TrailerModalProps {
  videos: TMDBVideo[];
}

export default function TrailerModal({ videos }: TrailerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const trailer =
    videos?.find(
      (v) =>
        v.type === "Trailer" &&
        v.site === "YouTube" &&
        v.name.toLowerCase().includes("official"),
    ) ||
    videos?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos?.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
    videos?.find((v) => v.site === "YouTube") ||
    videos?.[0];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsLoading(true);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onMouseDown={() => {
          console.log("Mouse Down - Setting Modal Open");
          handleOpen();
        }}
        onClick={(e) => {
          console.log("Click registered", { videosCount: videos?.length });
          e.preventDefault();
          e.stopPropagation();
          handleOpen();
        }}
        className="group relative z-99 flex cursor-pointer items-center gap-4 overflow-hidden rounded-xl bg-brand-primary px-10 py-5 text-lg font-black tracking-tighter text-black shadow-2xl shadow-brand-primary/20 transition-all hover:scale-[1.02] hover:bg-brand-primary/90 active:scale-95"
      >
        <div className="relative z-10 flex items-center gap-3">
          <Play
            size={22}
            className="fill-current transition-transform duration-500 group-hover:scale-125"
          />
          <span>WATCH TRAILER</span>
        </div>

        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 transition-all duration-300 group-hover:h-2" />
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-2147483647 flex items-center justify-center p-4 md:p-12 lg:p-20 pointer-events-auto">
            {/* Cinematic Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300"
              onClick={() => setIsOpen(false)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,184,11,0.1)_0%,transparent_70%)]" />
            </div>

            {/* Modal Container */}
            <div className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_100px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-300">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-2xl transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95 cursor-pointer border border-white/10"
              >
                <X size={24} />
              </button>

              {trailer ? (
                <>
                  {/* Loading State */}
                  {isLoading && (
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-zinc-950">
                      <Loader2
                        size={56}
                        className="animate-spin text-brand-primary"
                      />
                      <div className="space-y-1 text-center">
                        <p className="text-[10px] font-black tracking-[0.5em] text-brand-primary uppercase">
                          Initializing Stream
                        </p>
                      </div>
                    </div>
                  )}

                  {/* YouTube Embed */}
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`}
                    title="Trailer"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsLoading(false)}
                  />
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
                  <p className="text-xl font-black uppercase tracking-tighter opacity-50">
                    Video Content Unavailable
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-white/5 border border-white/10 px-6 py-2 text-xs font-bold hover:bg-white hover:text-black transition-colors"
                  >
                    Return to Details
                  </button>
                </div>
              )}

              {/* Bottom Detail Strip */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 bg-linear-to-r from-transparent via-brand-primary to-transparent opacity-50" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
