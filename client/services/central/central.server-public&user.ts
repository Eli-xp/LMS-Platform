import "server-only";

import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const centralServerAPI = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  console.log("centralServerAPI called");

  // get cookies
  const cookieStore = await cookies();

  // request
  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...options.headers, Cookie: cookieStore.toString() },
  });

  // clg test
  console.log(response);

  if (response.status === 401) {
    ////////

    console.log("centralClientAPI - Before Rtry");
    // if Refresh Token Valid - Retry original request
    response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...options.headers, Cookie: cookieStore.toString() },
    });

    console.log("centralClientAPI - After Rtry");
    console.log(response);
  }

  if (!response.ok) {
    console.error(response.status);
  }

  return response;
};
