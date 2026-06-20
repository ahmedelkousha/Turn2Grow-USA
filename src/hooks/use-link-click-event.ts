"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Custom hook that returns a navigation handler for links.
 * If the link points to the current active route, it scrolls smoothly to the top of the page.
 * Otherwise, it navigates to the new route, playing an optional close/exit animation callback first.
 */
export function useLinkClickEvent() {
  const pathname = usePathname();
  const router = useRouter();

  return (e: MouseEvent<any>, href: string, handleClose?: (callback?: () => void) => void) => {
    e.preventDefault();

    const navigate = () => {
      if (pathname === href) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(href);
      }
    };

    if (handleClose) {
      handleClose(navigate);
    } else {
      navigate();
    }
  };
}
