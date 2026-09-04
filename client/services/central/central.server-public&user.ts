import "server-only";

import { cookies } from "next/headers";
const API_URL = process.env.API_URL;

export const centralServerAPI = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  console.log("centralServerAPI called");

  // get cookies
  const cookieStore = await cookies();

  // request
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...options.headers, Cookie: cookieStore.toString() },
  });

  // clg test
  console.log(response);

  if (response.status === 401) {
    ////////

    console.log(response);
    console.log(`centralClientAPI - response.status ${response.status}`);
  }

  if (!response.ok) {
    console.error(response.status);
  }

  return response;
};
