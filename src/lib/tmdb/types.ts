/**
 * TMDB API Type Definitions
 * Based on Official TMDB API Specification v3
 * Strictly Typed for OTT Platform
 */

export type MediaType = "movie" | "tv" | "person";
export type TimeWindow = "day" | "week";

export interface TMDBBase {
  id: number;
  popularity: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

export interface Movie extends TMDBBase {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TVShow extends TMDBBase {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface Person {
  media_type: "person";
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for_department: string;
  known_for: (Movie | TVShow)[];
}

export type MediaItem = Movie | TVShow | Person;

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube" | "Vimeo";
  size: 360 | 480 | 720 | 1080;
  type:
    | "Trailer"
    | "Teaser"
    | "Clip"
    | "Featurette"
    | "Behind the Scenes"
    | "Bloopers";
  official: boolean;
  published_at: string;
}

export interface Cast {
  adult: boolean;
  gender: 0 | 1 | 2 | 3;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: 0 | 1 | 2 | 3;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface TMDBImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
}

export interface BaseMediaDetails {
  genres: Genre[];
  homepage: string;
  status: string;
  tagline: string;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: TMDBVideo[];
  };
  images?: {
    backdrops: TMDBImage[];
    posters: TMDBImage[];
    logos: TMDBImage[];
  };
}

export interface MovieDetails extends Movie, BaseMediaDetails {
  budget: number;
  revenue: number;
  runtime: number;
  similar?: TMDBResponse<Movie>;
  recommendations?: TMDBResponse<Movie>;
}

export interface TVDetails extends TVShow, BaseMediaDetails {
  episode_run_time: number[];
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  type: string;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];
  similar?: TMDBResponse<TVShow>;
  recommendations?: TMDBResponse<TVShow>;
}

export type MediaDetails = MovieDetails | TVDetails;
