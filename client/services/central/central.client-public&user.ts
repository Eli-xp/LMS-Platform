const API_URL = process.env.NEXT_PUBLIC_API_URL;

let refreshPromise: Promise<boolean> | null = null;
let logoutPromise: Promise<void | Response> | null = null;

// func - refreshAccessToken
async function refreshAccessToken(): Promise<boolean> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  // boolean response
  return response.ok;
}

// Prevent race condition
const refreshOnClient = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

// func - handleAuthFailure
const handleAuthFailure = async (): Promise<void> => {
  if (!logoutPromise) {
    logoutPromise = fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .catch((error) => {
        console.error("Logout failed:", error);
      })
      .finally(() => {
        logoutPromise = null;
      });
  }

  await logoutPromise;

  // redirect
  window.location.href = "/login";
};

interface centralClientAPIOptions extends RequestInit {
  auth?: boolean;
}

// main func - centralClientAPI
export const centralClientAPI = async (
  endpoint: string,
  options: centralClientAPIOptions = {},
) => {
  console.log("centralClientAPI Called");

  const { auth = true, ...fetchOptions } = options;

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
  });

  // clg test
  console.log(response);

  if (!auth) {
    return response;
  }

  //  if authorized
  if (response.status !== 401) {
    return response;
  }

  //// if unauthorized (401) - Access Token Expired
  // Refresh Token Request
  const refreshed = await refreshOnClient();
  console.log(refreshed);

  // if Refresh Token Expired
  if (!refreshed) {
    await handleAuthFailure();
    return;
  }

  console.log("centralClientAPI - Before Rtry");
  // if Refresh Token Valid - Retry original request
  response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
  });

  console.log("centralClientAPI - After Rtry");
  console.log(response);

  if (!response.ok) {
    console.error(response.status);
  }

  return response;
};
