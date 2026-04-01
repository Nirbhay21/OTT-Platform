"use client";

import { Cast, Crew } from "@/lib/tmdb/types";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import CastAvatar from "./CastAvatar";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  cast: Cast[];
  crew: Crew[];
  getImageUrl: (
    path: string | null,
    size: "original" | "w500" | "w780" | "w185",
  ) => string;
}

export default function CreditsModal({
  isOpen,
  onClose,
  title,
  cast,
  crew,
  getImageUrl,
}: CreditsModalProps) {
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

  if (!isOpen) return null;
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 px-8 py-6 backdrop-blur-md">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-white">
              {title}
            </h2>
            <p className="text-xs font-black tracking-widest text-brand-primary uppercase">
              Full Credits
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white/10 hover:rotate-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="space-y-12">
            {/* Cast Section */}
            <section className="space-y-6">
              <h3 className="text-xs font-black tracking-[0.4em] text-zinc-500 uppercase">
                Cast
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {cast.map((person) => (
                  <div
                    key={`${person.id}-${person.character}`}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="relative aspect-square w-24 overflow-hidden rounded-full border border-white/10">
                      <CastAvatar
                        src={
                          person.profile_path
                            ? getImageUrl(person.profile_path, "w185")
                            : null
                        }
                        alt={person.name}
                        variant="user"
                        sizes="96px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {person.name}
                      </p>
                      <p className="text-xs font-medium text-zinc-500">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Crew Section - Grouped by Department */}
            <section className="space-y-6">
              <h3 className="text-xs font-black tracking-[0.4em] text-zinc-500 uppercase">
                Crew Highlights
              </h3>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                {crew
                  .filter((_, i) => i < 24)
                  .map((person, i) => (
                    <div
                      key={`${person.id}-${person.job}-${i}`}
                      className="space-y-1"
                    >
                      <p className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                        {person.job}
                      </p>
                      <p className="text-sm font-bold leading-tight text-white">
                        {person.name}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
