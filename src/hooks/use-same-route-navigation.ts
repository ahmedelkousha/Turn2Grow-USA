"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Returns an onClick handler for Next.js Links that smoothly scrolls 
 * to the top of the page if the user clicks a link to the route they are already on.
 */
export function useSameRouteNavigation() {
  const pathname = usePathname();

  return (href: string, callback?: () => void) => {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      if (pathname === href) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (callback) {
        callback();
      }
    };
  };
}
