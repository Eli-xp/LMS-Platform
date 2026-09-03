import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "./services/auth/atuh utility/cookies";
import { isTokenExpiringSoon } from "./services/auth/atuh utility/jwt";
import { refreshTokens } from "./services/auth/atuh utility/refresh";

// default threshhold of 2 min
const REFRESH_THRESHOLD_SECONDS = 120;
// define public routes
const PUBLIC_ROUTES = ["/login", "/register"];

//// function - Check if public Route
function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

//// function - redirect To Login
function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);

  loginUrl.searchParams.set(
    "callbackUrl",
    request.nextUrl.pathname + request.nextUrl.search,
  );

  const response = NextResponse.redirect(loginUrl);

  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);

  return response;
}

//// Proxy
export async function proxy(request: NextRequest) {
  console.log("proxy ran!!!!!");
  const pathname = request.nextUrl.pathname;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get cookies
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  // if JWT not available - redirect
  if (!accessToken && !refreshToken) {
    return redirectToLogin(request);
  }

  // if Access token available and valid - continue
  if (
    accessToken &&
    !isTokenExpiringSoon(accessToken, REFRESH_THRESHOLD_SECONDS)
  ) {
    return NextResponse.next();
  }

  // if Access token available but Refresh token not
  if (!refreshToken) {
    return redirectToLogin(request);
  }

  // if Refresh token available - call refresh API
  const tokens = await refreshTokens(refreshToken);

  // if refresh API failed(null) - redirect
  if (!tokens) {
    return redirectToLogin(request);
  }

  ////// if refresh API succed - handle new tokens for current request and browser

  //// Handle Current Request update
  // Get current request's header
  const requestHeaders = new Headers(request.headers);

  // create tokens array
  const updatedCookieHeader = [
    `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(tokens.accessToken)}`,
    `${REFRESH_TOKEN_COOKIE}=${encodeURIComponent(tokens.refreshToken)}`,
  ].join("; ");

  // create cookie's key-value object
  requestHeaders.set("cookie", updatedCookieHeader);

  // Set The new header for currnet request
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  //// Handle Browser Request update
  // updating response with new tokens
  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    tokens.accessToken,
    accessTokenCookieOptions,
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    tokens.refreshToken,
    refreshTokenCookieOptions,
  );

  // return the request response
  return response;
}

// matcher
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
