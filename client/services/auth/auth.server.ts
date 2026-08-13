import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUserOnServer = async () => {
  console.log("getCurrentUserOnServer CALLED");
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.toString();

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: accessToken,
      },
      cache: "no-store",
    });

    // 401 - Unauthorized
    if (res.status === 401) {
      console.log(`getCurrentUser:: ${res.status}`);
      return {
        user: null,
      };
    }

    if (!res.ok) {
      throw new Error(
        `getCurrentUser:: Failed to Get Current User: ${res.status}`,
      );
    }

    const data = await res.json();
    console.log("getCurrentUserOnServer Successfully!");
    return { user: data };
  } catch (error) {
    console.error(error);
    return {
      user: null,
    };
  }
};
