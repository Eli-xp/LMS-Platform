const API_URL = process.env.NEXT_PUBLIC_API_URL;

let sessionExpiredHandler: (() => void) | null = null;
export const setSessionExpiredHandler = (handler: () => void) => {
  sessionExpiredHandler = handler;
};

// Prevent parallel refresh request
let refreshPromise: Promise<void> | null = null;

export const refreshToken = async () => {
  console.log(refreshPromise);
  if (!refreshPromise) {
    console.log("refreshToken:: refreshToken CALLED");
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          console.log(`refreshToken:: Refresh Token Expired ${res.status}`);
          sessionExpiredHandler?.();
          throw new Error(`SESSION_EXPIRED ${res.status}`);
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const getCurrentUserOnClient = async () => {
  console.log("getCurrentUserOnClient ran");

  const res = fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to Login ${res.status});
    }`);
  }

  const data = await res.json();
  console.log(data);
  return data;
};
