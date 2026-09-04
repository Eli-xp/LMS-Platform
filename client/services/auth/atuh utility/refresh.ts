const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not configured");
}

// refreshTokens
export async function refreshTokens(
  refreshToken: string,
): Promise<Response | null> {
  console.log("🚀refreshTokens ran", refreshToken);

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${encodeURIComponent(refreshToken)}`,
      },
      cache: "no-store",
    });

    console.log("🚀refreshTokens response:", response.status);

    if (!response.ok) {
      return null;
    }

    return response;
  } catch (error) {
    console.error("Refresh token request failed:", error);

    return null;
  }
}
