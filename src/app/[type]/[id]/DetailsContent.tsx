import { tmdbService } from "@/lib/tmdb/service";
import { MovieDetails, TVDetails } from "@/lib/tmdb/types";
import { Calendar, Clock, Star, TrendingUp } from "lucide-react";
import CastAvatar from "./CastAvatar";
import CreditsModalWrapper from "./CreditsModalWrapper";
import ProgressiveImage from "./ProgressiveImage";
import RecommendationsSection from "./RecommendationsSection";
import TrailerModal from "./TrailerModal";

const detailsBackdropBlurDataURL =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23131313'/%3E%3Cstop offset='1' stop-color='%23262626'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E";

const detailsPosterBlurDataURL =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 3'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23151515'/%3E%3Cstop offset='1' stop-color='%23323232'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='2' height='3' fill='url(%23g)'/%3E%3C/svg%3E";

interface DetailsContentProps {
  type: string;
  id: string;
  media: MovieDetails | TVDetails;
}

export default function DetailsContent({
  type,
  id,
  media,
}: DetailsContentProps) {
  const data = media;
  const title = (media as MovieDetails).title || (media as TVDetails).name;
  const releaseDate =
    (media as MovieDetails).release_date || (media as TVDetails).first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const runtime = (media as MovieDetails).runtime
    ? `${(media as MovieDetails).runtime} min`
    : (media as TVDetails).episode_run_time?.[0]
      ? `${(media as TVDetails).episode_run_time[0]} min`
      : "N/A";

  const cast = media.credits?.cast?.slice(0, 12) || [];
  const crew = media.credits?.crew || [];
  const director = crew.find(
    (c) => c.job === "Director" || c.job === "Executive Producer",
  )?.name;
  const writer = Array.from(
    new Set(
      crew
        .filter(
          (p) =>
            p.job === "Writer" || p.job === "Screenplay" || p.job === "Story",
        )
        .map((el) => el.name),
    ),
  ).join(", ");

  return (
    <div className="relative min-h-screen bg-zinc-950 text-neutral-100 selection:bg-brand-primary selection:text-black">
      <div className="fixed inset-0 z-0 h-[60vh] w-full lg:h-screen">
        <ProgressiveImage
          src={tmdbService.getImageUrl(data.backdrop_path, "w780")}
          alt={title}
          fill
          blurDataURL={detailsBackdropBlurDataURL}
          sizes="100vw"
          quality={75}
          className="object-cover opacity-50 contrast-125 saturate-150"
          priority
        />
        {/* Cinematic Gradient Masking */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-zinc-950/20" />

        {/* Subtle Film Grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-[10vh] pb-12 xl:pt-[12vh]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left: Poster Section */}
          <div className="mx-auto w-full max-w-55 sm:max-w-65 lg:mx-0 lg:max-w-none lg:col-span-4">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-700">
              <ProgressiveImage
                src={tmdbService.getImageUrl(data.poster_path, "w500")}
                alt={title}
                width={500}
                height={750}
                blurDataURL={detailsPosterBlurDataURL}
                sizes="(max-width: 1024px) 70vw, 30vw"
                quality={75}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col space-y-6 lg:col-span-8">
            <div className="space-y-3">
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-3 text-xs font-black tracking-[0.3em] text-brand-primary uppercase">
                <TrendingUp size={14} strokeWidth={3} />
                <span>
                  {type === "movie" ? "Feature Film" : "Premium Series"}
                </span>
                {data.status && (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                    <span className="text-zinc-500">{data.status}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-5xl">
                {title}
              </h1>

              {/* Tagline */}
              {data.tagline && (
                <p className="max-w-2xl text-lg font-medium text-zinc-400">
                  <span className="mr-2 text-brand-primary opacity-50">
                    &quot;
                  </span>
                  {data.tagline}
                  <span className="ml-2 text-brand-primary opacity-50">
                    &quot;
                  </span>
                </p>
              )}

              {/* Key Metadata Stats */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-zinc-900/80 px-3 py-1.5 ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="flex items-center">
                    {[...Array(10)].map((_, i) => {
                      const rating = data.vote_average;
                      const isFull = i + 1 <= Math.floor(rating);
                      const isHalf = i < rating && i + 1 > rating;

                      return (
                        <div key={i} className="relative">
                          {/* Background Star (Lighter Muted Fill) */}
                          <Star
                            size={12}
                            className="text-white/10 fill-white/10"
                          />

                          {/* Foreground Star (Solid Fill) */}
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                              width: isFull
                                ? "100%"
                                : isHalf
                                  ? `${(rating % 1) * 100}%`
                                  : "0%",
                            }}
                          >
                            <Star
                              size={12}
                              className="text-brand-primary fill-brand-primary"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-baseline gap-1 ml-2">
                    <span className="text-sm font-black text-white">
                      {data.vote_average.toFixed(1)}
                    </span>
                    <span className="text-sm font-bold text-zinc-500">
                      / 10
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                  <Clock size={14} className="text-zinc-500" />
                  <span>{runtime}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                  <Calendar size={14} className="text-zinc-500" />
                  <span>{releaseYear}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                  Genres
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-md border border-white/5 bg-white/3 px-3 py-1 text-[10px] font-black tracking-widest text-zinc-300 uppercase transition-colors hover:bg-white/8"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <TrailerModal videos={media.videos?.results || []} />
            </div>

            {/* Content Divider */}
            <div className="h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent my-4" />

            {/* Overview Section */}
            <div className="max-w-3xl space-y-2">
              <h3 className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                Synopsis
              </h3>
              <p className="text-lg leading-relaxed font-medium text-zinc-200">
                {data.overview}
              </p>
            </div>

            {/* Key Personnel */}
            <div className="grid grid-cols-1 gap-6 py-1 md:grid-cols-3">
              {director && (
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                    Director
                  </p>
                  <p className="text-base font-bold text-white leading-tight">
                    {director}
                  </p>
                </div>
              )}
              {writer && (
                <div className="col-span-2 space-y-1">
                  <p className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                    Writers
                  </p>
                  <p className="text-base font-bold text-white leading-tight">
                    {writer}
                  </p>
                </div>
              )}
            </div>

            {/* Cast Row Section */}
            {cast && cast.length > 0 && (
              <div className="space-y-4 pt-1">
                <CreditsModalWrapper
                  title={title}
                  cast={media.credits?.cast || []}
                  crew={media.credits?.crew || []}
                />
                <div className="flex flex-wrap items-start justify-start gap-6 sm:gap-8">
                  {cast.slice(0, 5).map((person) => (
                    <div
                      key={person.id}
                      className="group flex w-20 sm:w-24 flex-col items-center gap-3"
                    >
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-full border border-white/5 bg-zinc-900 transition-all duration-500 group-hover:border-brand-primary group-hover:shadow-lg group-hover:shadow-brand-primary/10">
                        <CastAvatar
                          src={
                            person.profile_path
                              ? tmdbService.getImageUrl(
                                  person.profile_path,
                                  "w185",
                                )
                              : null
                          }
                          alt={person.name}
                          variant="users"
                          sizes="(max-width: 640px) 80px, 96px"
                          imageClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="w-full text-center">
                        <p className="truncate text-xs font-black text-white">
                          {person.name}
                        </p>
                        <p className="truncate text-[10px] font-medium text-zinc-500">
                          {person.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Content Sections */}
        <div className="mt-10 space-y-10">
          <RecommendationsSection id={id} type={type} sectionType="similar" />
          <RecommendationsSection
            id={id}
            type={type}
            sectionType="recommendations"
          />
        </div>
      </div>
    </div>
  );
}
