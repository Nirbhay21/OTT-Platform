import SearchContent from "@/components/SearchContent";
import { tmdbService } from "@/lib/tmdb/service";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q;
  const query = Array.isArray(q) ? q[0] : q;

  const initialData = query
    ? await tmdbService.search(query, "1")
    : {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };

  return (
    <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-8 pb-24 lg:pb-12 xl:pt-10">
      <SearchContent
        key={query || "search-empty"}
        query={query || ""}
        initialData={initialData}
      />
    </div>
  );
}
