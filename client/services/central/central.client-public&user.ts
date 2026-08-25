const API_URL = process.env.NEXT_PUBLIC_API_URL;
let refreshPromise: Promise<boolean> | null = null;

const refresh = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

const handleAuthFailure = async () => {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
};

interface centralClientAPIOptions extends RequestInit {
  auth?: boolean;
}

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
  const refreshed = await refresh();

  // if Refresh Token Expired
  if (!refreshed) {
    await handleAuthFailure();
    return;
  }

  console.log("centralClientAPI - Before Rtry")
  // if Refresh Token Valid - Retry original request
  response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
  });

  console.log("centralClientAPI - After Rtry")
  console.log(response)


  return response;
};
