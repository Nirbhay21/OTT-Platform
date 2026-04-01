"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface HorizontalScrollClientWrapperProps {
  children: ReactNode;
  headerSlot?: ReactNode;
}

const HorizontalScrollClientWrapper = ({
  children,
  headerSlot,
}: HorizontalScrollClientWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const showLeftRef = useRef(false);
  const showRightRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const nextShowLeft = scrollLeft > 10;
      const nextShowRight = scrollLeft < scrollWidth - clientWidth - 10;

      if (nextShowLeft !== showLeftRef.current) {
        showLeftRef.current = nextShowLeft;
        setShowLeftArrow(nextShowLeft);
      }

      if (nextShowRight !== showRightRef.current) {
        showRightRef.current = nextShowRight;
        setShowRightArrow(nextShowRight);
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      checkScroll();
      rafRef.current = null;
    });
  }, [checkScroll]);

  useEffect(() => {
    const current = containerRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll, { passive: true });
      // Initial check
      checkScroll();
      // Also check on resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      current?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [checkScroll, handleScroll]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        {headerSlot}

        {/* Compact Navigation Controls - Essential for desktop navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!showLeftArrow}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-500/10 text-white transition-all hover:bg-brand-primary hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!showRightArrow}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-500/10 text-white transition-all hover:bg-brand-primary hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="group relative isolate">
        <div
          ref={containerRef}
          className="no-scrollbar flex gap-6 overflow-x-auto py-2 px-1"
        >
          {children}
        </div>

        {/* Floating Arrows for better UX */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-primary text-black shadow-2xl transition-transform hover:scale-110 active:scale-95 lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-primary text-black shadow-2xl transition-transform hover:scale-110 active:scale-95 lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalScrollClientWrapper;
