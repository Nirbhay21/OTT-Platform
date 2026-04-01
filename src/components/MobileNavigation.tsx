"use client";

import { mobileNavigation } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";

const STYLE_CONSTANTS = {
  nav: "fixed bottom-0 left-0 right-0 h-16 bg-background/80 px-2 backdrop-blur-xl border-t border-white/10 lg:hidden z-50",
  container: "flex h-full items-center justify-between text-muted-foreground",
  icon: "h-5 w-5 mb-1",
  label: "text-[10px] font-medium tracking-wide uppercase",
  baseLink:
    "flex flex-col items-center justify-center flex-1 h-full transition-colors",
  focusState: "focus:outline-none",
};

const NavItem = memo(
  ({
    href,
    Icon,
    label,
  }: {
    href: string;
    Icon: React.ElementType;
    label: string;
  }) => {
    const pathname = usePathname();

    // Basic active check. If href is '/', need exact match. Otherwise, just startsWith (e.g., /movie/...) could be used, but since we have global sections, let's use exact or prefix match effectively.
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
      <Link
        href={href}
        className={`
        ${STYLE_CONSTANTS.baseLink}
        ${isActive ? "text-brand-primary" : "hover:text-white focus:text-white"}
        ${STYLE_CONSTANTS.focusState}
      `}
        aria-label={`${label} page`}
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
      >
        <Icon
          className={STYLE_CONSTANTS.icon}
          aria-hidden="true"
          role="presentation"
        />
        <span className={STYLE_CONSTANTS.label} role="menuitem">
          {label}
        </span>
      </Link>
    );
  },
);

NavItem.displayName = "NavItem";

const MobileNavigation = memo(() => {
  const navItems = useMemo(
    () =>
      mobileNavigation.map((nav) => (
        <NavItem
          key={nav.label + "MobileNavigation"}
          href={nav.href}
          Icon={nav.icon}
          label={nav.label}
        />
      )),
    [],
  );

  return (
    <nav
      className={STYLE_CONSTANTS.nav}
      role="navigation"
      aria-label="Mobile Navigation"
    >
      <div
        className={STYLE_CONSTANTS.container}
        role="menubar"
        aria-orientation="horizontal"
      >
        {navItems}
      </div>
    </nav>
  );
});

MobileNavigation.displayName = "MobileNavigation";

export default MobileNavigation;
