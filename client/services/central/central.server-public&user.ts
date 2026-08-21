import "server-only";

import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const centralServerAPI = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  console.log("centralServerAPI called");

  const cookieStore = await cookies();
  console.log(cookieStore);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...options.headers, Cookie: cookieStore.toString() },
  });

  if (response.status !== 401) {
    return response;
  }

  return response;
};
