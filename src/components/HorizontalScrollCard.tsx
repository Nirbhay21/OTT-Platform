import { MediaItem } from "@/lib/tmdb/types";
import Card from "./Card";
import HorizontalScrollClientWrapper from "./HorizontalScrollClientWrapper";

interface HorizontalScrollCardProps {
  data: MediaItem[];
  heading: string;
  trending?: boolean;
  mediaType?: "movie" | "tv";
  className?: string;
}

const HorizontalScrollCard = ({
  data,
  heading,
  trending,
  mediaType,
  className,
}: HorizontalScrollCardProps) => {
  if (!data || data.length === 0) return null;
  const visibleItems = data
    .filter((item) => {
      if (!item || item.media_type === "person" || !item.poster_path) {
        return false;
      }

      const hasResolvableMediaType =
        item.media_type === "movie" ||
        item.media_type === "tv" ||
        Boolean(mediaType);

      return hasResolvableMediaType;
    })
    .slice(0, 12);

  if (visibleItems.length === 0) return null;

  const header = (
    <div className="space-y-1">
      <h2 className="text-2xl font-black uppercase tracking-tighter text-white md:text-3xl lg:text-4xl">
        {heading}
      </h2>
      <div className="h-1 w-12 rounded-full bg-brand-primary" />
    </div>
  );

  return (
    <section
      className={`container mx-auto py-2 px-4 lg:px-8 ${className || ""}`}
    >
      <HorizontalScrollClientWrapper headerSlot={header}>
        {visibleItems.map((item, index) => {
          const uniqueKey = `hcard-${heading.replace(/\s+/g, "-").toLowerCase()}-${item.id}-${index}`;
          return (
            <div key={uniqueKey} className="h-87 w-58 shrink-0">
              <Card
                data={item}
                index={index + 1}
                trending={trending}
                mediaType={mediaType}
              />
            </div>
          );
        })}
      </HorizontalScrollClientWrapper>
    </section>
  );
};

export default HorizontalScrollCard;
