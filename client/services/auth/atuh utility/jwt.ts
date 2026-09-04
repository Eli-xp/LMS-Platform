// TS Definition
export type DecodedJwtPayload = {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: unknown;
};

// function - JWT Decode
export function decodeJwtPayload(token: string): DecodedJwtPayload | null {

console.log("💚decodeJwtPayload ran")
console.log(token)

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = Buffer.from(parts[1], "base64url").toString("utf8");

    return JSON.parse(payload) as DecodedJwtPayload;
  } catch {
    return null;
  }
}

// function - Threshold Validation
export function isTokenExpiringSoon(
  token: string,
  thresholdInSeconds = 120,
): boolean {
  const payload = decodeJwtPayload(token);

console.log("💚isTokenExpiringSoon ran")
  console.log(payload);

  if (!payload?.exp) {
    return true;
  }

  // current time in seconds
  const now = Math.floor(Date.now() / 1000);

  // return boolean
  return payload.exp <= now + thresholdInSeconds;
}

// function - Expiration Validation
export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);

console.log("💚isTokenExpired ran")

  console.log(payload)

  if (!payload?.exp) {
    return true;
  }

  // current time in seconds
  const now = Math.floor(Date.now() / 1000);

  // return boolean
  return payload.exp <= now;
}
