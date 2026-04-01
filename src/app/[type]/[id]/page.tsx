import { tmdbService } from "@/lib/tmdb/service";
import { notFound } from "next/navigation";
import DetailsContent from "./DetailsContent";

interface PageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

async function MediaContent({ type, id }: { type: string; id: string }) {
  let media;
  try {
    media =
      type === "movie"
        ? await tmdbService.getMovieDetails(id)
        : type === "tv"
          ? await tmdbService.getTVDetails(id)
          : notFound();
  } catch {
    notFound();
  }

  return <DetailsContent type={type} id={id} media={media} />;
}

export default async function Page({ params }: PageProps) {
  const { type, id } = await params;

  return <MediaContent type={type} id={id} />;
}
