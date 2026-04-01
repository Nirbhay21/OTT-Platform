import ExploreContent from "@/components/ExploreContent";
import { tmdbService } from "@/lib/tmdb/service";
import { notFound } from "next/navigation";

// Optional: Force dynamic if we want real-time popular data
export const revalidate = 3600;

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const resolvedParams = await params;
  const { type } = resolvedParams;

  if (type !== "movie" && type !== "tv") {
    notFound();
  }

  const initialData = await tmdbService.getDiscoverMedia(type, "1");

  return (
    <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-8 pb-24 lg:pb-12 xl:pt-10">
      <ExploreContent type={type} initialData={initialData} />
    </div>
  );
}
