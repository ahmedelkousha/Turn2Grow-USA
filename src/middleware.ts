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

  const isProd = process.env.NODE_ENV === "production";
  // Active simulation cookie is only allowed in development mode
  const isCookieActive = !isProd && request.cookies.get("coming_soon_active")?.value === "true";

  const isComingSoonMode = isEnvActive || isCookieActive;

  // 3. Check if bypass is requested
  const bypassToken = process.env.BYPASS_TOKEN;
  let expectedBypassValue = "";

  if (isProd) {
    if (bypassToken && bypassToken !== "true" && bypassToken !== "false") {
      // Use the custom secret token configured in production environment variables
      expectedBypassValue = bypassToken;
    } else {
      // Default secure fallback token to prevent unauthorized access if no env token is defined
      expectedBypassValue = "turn2grow_secure_bypass_prod_key_2026";
    }
  } else {
    // In development mode, allow simple bypass values
    expectedBypassValue = bypassToken || "true";
  }

  const queryBypassValue = request.nextUrl.searchParams.get("bypass") || request.nextUrl.searchParams.get("coming-soon-bypass");
  const cookieBypassValue = request.cookies.get("coming_soon_bypass")?.value;

  // Verify match with expected token, or allow "true" fallback if in local development
  const isValidQueryBypass =
    queryBypassValue === expectedBypassValue ||
    (!isProd && queryBypassValue === "true");

  const isValidCookieBypass =
    cookieBypassValue === expectedBypassValue ||
    (!isProd && cookieBypassValue === "true");

  const isBypassed = isValidQueryBypass || isValidCookieBypass;

  // 4. Handle redirection or bypass cookie setting
  if (isComingSoonMode && !isBypassed) {
    const comingSoonUrl = new URL("/coming-soon", request.url);
    return NextResponse.redirect(comingSoonUrl);
  }

  // If there was a query bypass, set the cookie containing the token so future navigations are bypassed too
  if (isValidQueryBypass && !isValidCookieBypass) {
    const response = NextResponse.next();
    const cookieVal = queryBypassValue === "true" ? "true" : expectedBypassValue;
    response.cookies.set("coming_soon_bypass", cookieVal, {
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
