import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass assets, static files, favicon, API, and the coming-soon page itself
  const isAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico";

  if (isAsset) {
    return NextResponse.next();
  }

  // Prevent redirect loop
  if (pathname === "/coming-soon" || pathname.startsWith("/coming-soon/")) {
    return NextResponse.next();
  }

  // 2. Check if Coming Soon blocking mode is active
  const isEnvActive =
    process.env.COMING_SOON !== "false" &&
    process.env.NEXT_PUBLIC_COMING_SOON !== "false";
  const isCookieActive =
    request.cookies.get("coming_soon_active")?.value === "true";

  const isComingSoonMode = isEnvActive || isCookieActive;

  // 3. Check if bypass is requested
  const hasQueryBypass =
    request.nextUrl.searchParams.get("bypass") === "true" ||
    request.nextUrl.searchParams.get("coming-soon-bypass") === "true";
  const hasCookieBypass =
    request.cookies.get("coming_soon_bypass")?.value === "true";

  const isBypassed = hasQueryBypass || hasCookieBypass;

  // 4. Handle redirection or bypass cookie setting
  if (isComingSoonMode && !isBypassed) {
    const comingSoonUrl = new URL("/coming-soon", request.url);
    return NextResponse.redirect(comingSoonUrl);
  }

  // If there was a query bypass, set the cookie so future navigations are bypassed too
  if (hasQueryBypass && !hasCookieBypass) {
    const response = NextResponse.next();
    response.cookies.set("coming_soon_bypass", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }

  return NextResponse.next();
}

// Support matcher to run middleware on all paths except static / API paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
