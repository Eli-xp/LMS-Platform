import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
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
  console.log("😶‍🌫️😶‍🌫️😶‍🌫️redirectToLogin ran!");

  const loginUrl = new URL("/login", request.url);

  loginUrl.searchParams.set(
    "callbackUrl",
    request.nextUrl.pathname + request.nextUrl.search,
  );

  // redirect to login page
  const response = NextResponse.redirect(loginUrl);

  // delete browser's current tokens
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);

  return response;
}

// function - extractCookieValue
function extractCookieValue(
  setCookie: string,
  cookieName: string,
): string | null {
  const prefix = `${cookieName}=`;

  if (!setCookie.startsWith(prefix)) {
    return null;
  }

  const cookiePair = setCookie.split(";", 1)[0];

  return cookiePair.slice(prefix.length);
}

//// Proxy
export async function proxy(request: NextRequest) {
  console.log("🔥🔥🔥 PROXY RAN:", request.nextUrl.pathname);
  const pathname = request.nextUrl.pathname;

  if (isPublicRoute(pathname)) {
    console.log("🔥🔥🔥 PROXY - isPublicRoute ran");

    return NextResponse.next();
  }

  // Get browser cookies
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  // if JWT not available - redirect
  if (!accessToken && !refreshToken) {
    console.log(
      "🔥🔥🔥 PROXY - !accessToken && !refreshToken!accessToken && !refreshToken",
    );

    return redirectToLogin(request);
  }

  // if Access token available and valid - continue
  if (
    accessToken &&
    !isTokenExpiringSoon(accessToken, REFRESH_THRESHOLD_SECONDS)
  ) {
    console.log(
      "🔥🔥🔥 PROXY - if Access token available and valid - continue",
    );
    return NextResponse.next();
  }

  // if Access token available but Refresh token not
  if (!refreshToken) {
    console.log("🔥🔥🔥 PROXY - !refreshToken");

    return redirectToLogin(request);
  }

  // if Refresh token available - call refresh API
  console.log("🔥🔥🔥 PROXY - refreshTokens function called!", refreshToken);
  const refreshResponse = await refreshTokens(refreshToken);
  console.log("🔥🔥🔥 PROXY - tokens:", refreshResponse);

  // if refresh API failed(null) - redirect
  if (!refreshResponse) {
    console.log("🔥🔥🔥 PROXY - !tokens");
    return redirectToLogin(request);
  }

  ////// if refresh API succed - handle new tokens for current request and browser

  // Get newAccessTokenCookie
  const newAccessTokenCookie = refreshResponse.headers.get("set-cookie");
  console.log("🍪 New access-token Set-Cookie:", newAccessTokenCookie);

  // Validate it
  if (!newAccessTokenCookie) {
    console.error(
      "❌ Refresh succeeded but access_token Set-Cookie is missing",
    );
    return redirectToLogin(request);
  }

  // Extract new access token token value
  const newAccessToken = extractCookieValue(
    newAccessTokenCookie,
    ACCESS_TOKEN_COOKIE,
  );

  console.log("🆕 New access token exists:", newAccessToken);

  // Token existing validation
  if (!newAccessToken) {
    console.error(
      "❌ Refresh succeeded, but new tokens were not found in Set-Cookie",
    );
    return redirectToLogin(request);
  }

  //// Handle Current Request update

  // create cookie's key-value object
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "cookie",
    `${ACCESS_TOKEN_COOKIE}=${newAccessToken}; ${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
  );

  // Continue current request with new cookies
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  //// Handle Browser Request update
  response.headers.set("Set-Cookie", newAccessToken);

  // return the request response
  console.log("✅ Refresh successful - request continues");
  return response;
}

// matcher
export const config = {
  matcher: ["/admin/:path*"],
};
