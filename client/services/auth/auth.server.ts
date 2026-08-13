import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async () => {
  console.log("getCurrentUser CALLED");
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.toString();
    console.log(accessToken);

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
        needsRefresh: true,
      };
    }

    if (!res.ok) {
      throw new Error(
        `getCurrentUser:: Failed to Get Current User: ${res.status}`,
      );
    }

    const data = await res.json();
    console.log(data);
    return { user: data, needsRefresh: false };
  } catch (error) {
    console.error(error);
    return {
      user: null,
      needsRefresh: false,
    };
  }
};
