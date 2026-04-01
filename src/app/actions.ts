"use server";

import { tmdbService } from "@/lib/tmdb/service";

export async function fetchDiscoverMedia(type: string, page: number) {
  return tmdbService.getDiscoverMedia(type, page.toString());
}

export async function fetchSearchResults(query: string, page: number) {
  return tmdbService.search(query, page.toString());
}
