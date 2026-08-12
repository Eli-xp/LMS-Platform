const API_URL = process.env.NEXT_PUBLIC_API_URL;

let sessionExpiredHandler: (() => void) | null = null;
export const setSessionExpiredHandler = (handler: () => void) => {
  sessionExpiredHandler = handler;
};

// Prevent parallel refresh request
let refreshPromise: Promise<void> | null = null;

export const refreshToken = async () => {
  console.log(refreshPromise)
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

// export const apiClient = async (
//   endpoint: string,
//   options: RequestInit = {},
// ) => {
//   // Client Request
//   console.log("Client Request ran");
//   let res = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     credentials: "include",
//     headers: { "Content-Type": "application/json", ...options.headers },
//   });

//   // if Access token expired
//   if (res.status === 401) {
//     console.log(`Client Request ran, ${res.status}`);
//     try {
//       // if Refresh success
//       await refreshToken();

//       //Retry Client Request
//       console.log("Retry Client Request ran");
//       res = await fetch(`${API_URL}${endpoint}`, {
//         ...options,
//         credentials: "include",
//         headers: { "Content-Type": "application/json", ...options.headers },
//       });
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   if (!res.ok) {
//     throw new Error(`Request failed: ${res.status}`);
//   }

//   return res.json();
// };
