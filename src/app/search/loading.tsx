import CardSkeleton from "@/components/CardSkeleton";

export default function SearchLoading() {
  return (
    <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-8 pb-24 lg:pb-12 xl:pt-10">
      <div className="flex flex-col space-y-6">
        <div className="h-8 w-100 rounded-lg bg-zinc-800 relative overflow-hidden md:h-10">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_750ms_infinite_linear] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="aspect-2/3 w-full">
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
