import {
  MediaItem,
  MovieDetails,
  TimeWindow,
  TMDBResponse,
  TVDetails,
} from "./types";

// Professional TMDB Server-Side Singleton Service
const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * Universal Fetcher with strict TypeScript generics and Next.js caching.
 */
async function fetchFromTMDB<T>(
  endpoint: string,
  options: {
    params?: Record<string, string>;
    revalidate?: number; // Cache duration in seconds (optional)
  } = {},
): Promise<T> {
  if (!TMDB_API_ACCESS_TOKEN) {
    throw new Error("TMDB_API_ACCESS_TOKEN is missing from .env");
  }

  // Handle URL construction with SearchParams
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
    next: {
      // Industry Standard: If no revalidate provided, cache for 1 hour by default
      revalidate: options.revalidate ?? 3600,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error(
      `[TMDB API ERROR]: ${response.status} ${response.statusText}`,
      {
        url: url.toString(),
        errorBody,
      },
    );
    throw new Error(`TMDB request failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Specialized Service methods for standardized data access.
 */
export const tmdbService = {
  // Trending content (Movies/TV)
  getTrending: async (
    type: string = "all",
    time: TimeWindow = "day",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>(`/trending/${type}/${time}`);
  },

  // Movie specific details with related data
  getMovieDetails: async (movieId: string): Promise<MovieDetails> => {
    return fetchFromTMDB<MovieDetails>(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos,similar,recommendations,credits,images",
      },
      revalidate: 86400, // Details rarely change - Cache for 24 hours
    });
  },

  // TV specific details
  getTVDetails: async (tvId: string): Promise<TVDetails> => {
    return fetchFromTMDB<TVDetails>(`/tv/${tvId}`, {
      params: {
        append_to_response: "videos,similar,recommendations,credits,images",
      },
      revalidate: 86400,
    });
  },

  // Search Results
  getSimilarMedia: async (
    type: string,
    id: string,
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>(`/${type}/${id}/similar`);
  },

  getRecommendations: async (
    type: string,
    id: string,
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>(
      `/${type}/${id}/recommendations`,
    );
  },

  // Universal Search
  search: async (
    query: string,
    page: string = "1",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>(`/search/multi`, {
      params: { query, page, include_adult: "false" },
      revalidate: 600, // Cache search for 10 minutes
    });
  },

  // Discover / Explore
  getDiscoverMedia: async (
    type: string,
    page: string = "1",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>(`/discover/${type}`, {
      params: { page, include_adult: "false", sort_by: "popularity.desc" },
    });
  },

  // Category specific methods
  getNowPlayingMovies: async (
    page: string = "1",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>("/movie/now_playing", {
      params: { page },
    });
  },

  getTopRatedMovies: async (
    page: string = "1",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>("/movie/top_rated", {
      params: { page },
    });
  },

  getPopularTVShows: async (
    page: string = "1",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>("/tv/popular", {
      params: { page },
    });
  },

  getOnTheAirTVShows: async (
    page: string = "1",
  ): Promise<TMDBResponse<MediaItem>> => {
    return fetchFromTMDB<TMDBResponse<MediaItem>>("/tv/on_the_air", {
      params: { page },
    });
  },

  // High-Performance Image Helper (Server Side)
  getImageUrl: (
    path: string | null,
    size: "original" | "w500" | "w780" | "w185" = "w500",
  ): string => {
    if (!path) return "/placeholder-image.jpg"; // Handle fallback
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};
