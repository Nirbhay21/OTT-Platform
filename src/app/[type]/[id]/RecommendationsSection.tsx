import HorizontalScrollCard from "@/components/HorizontalScrollCard";
import { tmdbService } from "@/lib/tmdb/service";

interface RecommendationsSectionProps {
  type: string;
  id: string;
  sectionType: "similar" | "recommendations" | "both";
}

async function RecommendationsData({
  type,
  id,
}: Omit<RecommendationsSectionProps, "sectionType">) {
  const { results: recommended } = (await tmdbService.getRecommendations(
    type,
    id,
  )) || { results: [] };

  if (recommended.length === 0) return null;

  return (
    <div className="space-y-2 pb-6 lg:pb-8">
      <div className="h-0.5 w-full bg-linear-to-r from-brand-primary/80 via-brand-primary/40 to-transparent shadow-[0_0_10px_rgba(229,184,11,0.2)]" />
      <HorizontalScrollCard
        heading="Recommended Content"
        data={recommended}
        mediaType={type as "movie" | "tv"}
        className="px-0 lg:px-0"
      />
    </div>
  );
}

async function SimilarData({
  type,
  id,
}: Omit<RecommendationsSectionProps, "sectionType">) {
  const { results: similar } = (await tmdbService.getSimilarMedia(
    type,
    id,
  )) || {
    results: [],
  };

  if (similar.length === 0) return null;

  return (
    <div className="space-y-2 pb-6 lg:pb-8">
      <div className="h-0.5 w-full bg-linear-to-r from-brand-primary/80 via-brand-primary/40 to-transparent shadow-[0_0_10px_rgba(229,184,11,0.2)]" />
      <HorizontalScrollCard
        heading="Similar Content"
        data={similar}
        mediaType={type as "movie" | "tv"}
        className="px-0 lg:px-0"
      />
    </div>
  );
}

export default function RecommendationsSection({
  type,
  id,
  sectionType = "both",
}: RecommendationsSectionProps) {
  const showSimilar = sectionType === "similar" || sectionType === "both";
  const showRecommended =
    sectionType === "recommendations" || sectionType === "both";

  return (
    <div className="space-y-0">
      {showSimilar && <SimilarData type={type} id={id} />}
      {showRecommended && <RecommendationsData type={type} id={id} />}
    </div>
  );
}
