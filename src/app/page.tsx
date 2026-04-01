import BannerHome from "@/components/BannerHome";
import BannerSkeleton from "@/components/BannerSkeleton";
import HorizontalScrollCard from "@/components/HorizontalScrollCard";
import HorizontalScrollCardSkeleton from "@/components/HorizontalScrollCardSkeleton";
import { tmdbService } from "@/lib/tmdb/service";
import { Suspense } from "react";

// Optimization: Ensure high-performance revalidation
export const revalidate = 3600; // 1 hour

// Minimalist Loading Skeleton to prevent layout shift
function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-24">
      <BannerSkeleton />
      <div className="relative z-40 space-y-16">
        <HorizontalScrollCardSkeleton heading="Top Trending" />
        <HorizontalScrollCardSkeleton heading="Now Playing" />
        <HorizontalScrollCardSkeleton heading="All-Time Classics" />
      </div>
    </div>
  );
}

async function LandingContent() {
  // Fetch multiple data streams in parallel for performance
  const [
    trendingResults,
    nowPlayingMovies,
    topRatedMovies,
    popularTV,
    onTheAirTV,
  ] = await Promise.all([
    tmdbService.getTrending("all", "day"),
    tmdbService.getNowPlayingMovies(),
    tmdbService.getTopRatedMovies(),
    tmdbService.getPopularTVShows(),
    tmdbService.getOnTheAirTVShows(),
  ]);

  return (
    <div className="flex flex-col gap-4 pb-24 overflow-hidden">
      {/* Dynamic Hero Section */}
      <BannerHome data={trendingResults.results} />

      {/* Main Content Rows */}
      <div className="space-y-16 relative z-40">
        <HorizontalScrollCard
          data={trendingResults.results}
          heading="Top Trending"
          trending={true}
        />

        <HorizontalScrollCard
          data={nowPlayingMovies.results}
          heading="Now Playing in Cinemas"
          mediaType="movie"
        />

        <HorizontalScrollCard
          data={topRatedMovies.results}
          heading="All-Time Classics"
          mediaType="movie"
        />

        <HorizontalScrollCard
          data={popularTV.results}
          heading="Popular Series"
          mediaType="tv"
        />

        <HorizontalScrollCard
          data={onTheAirTV.results}
          heading="Fresh on Air"
          mediaType="tv"
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <LandingContent />
    </Suspense>
  );
}
