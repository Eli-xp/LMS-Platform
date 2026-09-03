const API_URL = process.env.API_URL;

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

if (!API_URL) {
  throw new Error("API_URL is not configured");
}

// refreshTokens
export async function refreshTokens(
  refreshToken: string,
): Promise<RefreshResponse | null> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${encodeURIComponent(refreshToken)}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as RefreshResponse;

    if (!data.accessToken || !data.refreshToken) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Refresh token request failed:", error);

    return null;
  }
}
