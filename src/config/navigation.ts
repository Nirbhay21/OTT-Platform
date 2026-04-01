import { Film, Home, Search, Tv } from "lucide-react";

export const navigation = [
  {
    label: "TV Shows",
    href: "/tv",
    icon: Tv,
  },
  {
    label: "Movies",
    href: "/movie",
    icon: Film,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  ...navigation,
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
];
