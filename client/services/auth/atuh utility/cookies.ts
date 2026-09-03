import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export const ACCESS_TOKEN_MAX_AGE = 5 * 60;
export const REFRESH_TOKEN_MAX_AGE = 10 * 60;

export const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
};

export const accessTokenCookieOptions: Partial<ResponseCookie> = {
  ...cookieOptions,
  maxAge: ACCESS_TOKEN_MAX_AGE,
};

export const refreshTokenCookieOptions: Partial<ResponseCookie> = {
  ...cookieOptions,
  maxAge: REFRESH_TOKEN_MAX_AGE,
};
