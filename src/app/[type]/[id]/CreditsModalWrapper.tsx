"use client";

import { tmdbService } from "@/lib/tmdb/service";
import { Cast, Crew } from "@/lib/tmdb/types";
import { useState } from "react";
import CreditsModal from "./CreditsModal";

interface CreditsModalWrapperProps {
  title: string;
  cast: Cast[];
  crew: Crew[];
}

export default function CreditsModalWrapper({
  title,
  cast,
  crew,
}: CreditsModalWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-xs font-black tracking-[0.4em] text-zinc-500 uppercase">
          Top Cast
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer text-xs font-black tracking-widest text-brand-primary uppercase hover:underline"
        >
          View Full Credit
        </button>
      </div>

      <CreditsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        cast={cast}
        crew={crew}
        getImageUrl={(path, size) => tmdbService.getImageUrl(path, size)}
      />
    </>
  );
}
