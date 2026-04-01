"use client";

import { navigation } from "@/config/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import UserIcon from "./icons/UserIcon";

const HeaderContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const headerSearchInputRef = useRef<HTMLInputElement>(null);
  const [isHeaderInputFocused, setIsHeaderInputFocused] = useState(false);

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchInput, 500);

  const currentQueryFromUrl = searchParams.get("q") || "";
  const inputValue = isHeaderInputFocused ? searchInput : currentQueryFromUrl;

  // Sync search input with URL
  useEffect(() => {
    if (!isHeaderInputFocused) return;

    const normalizedDebouncedSearch = debouncedSearch.trim();
    const normalizedCurrentQuery = currentQueryFromUrl.trim();

    if (normalizedDebouncedSearch === normalizedCurrentQuery) return;

    if (normalizedDebouncedSearch) {
      router.replace(
        `/search?q=${encodeURIComponent(normalizedDebouncedSearch)}`,
      );
    } else if (pathname === "/search" && normalizedCurrentQuery) {
      router.replace("/search");
    }
  }, [
    currentQueryFromUrl,
    debouncedSearch,
    isHeaderInputFocused,
    pathname,
    router,
  ]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 bg-background/80 py-3 backdrop-blur-xl shadow-2xl border-b border-white/15`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Left: Logo & Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group inline-flex w-20 shrink-0">
            <Image
              src="/header-logo.svg"
              alt="Chitralay"
              width={560}
              height={390}
              priority
              className="h-auto w-full object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-brand-primary ${
                    isActive ? "text-brand-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search & User */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative group">
            <input
              ref={headerSearchInputRef}
              type="text"
              placeholder="Search..."
              value={inputValue}
              onFocus={() => {
                setIsHeaderInputFocused(true);
                setSearchInput(currentQueryFromUrl);
              }}
              onBlur={() => setIsHeaderInputFocused(false)}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-32 rounded-full border border-white/25 bg-white/5 py-2 pl-10 pr-4 text-xs font-medium text-white transition-all focus:w-48 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-brand-primary sm:w-48 sm:text-sm sm:focus:w-64"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-primary" />
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition-all hover:bg-brand-primary hover:text-black active:scale-90"
            aria-label="User Profile"
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default function Header() {
  return (
    <Suspense fallback={<div className="h-20 w-full bg-background" />}>
      <HeaderContent />
    </Suspense>
  );
}
