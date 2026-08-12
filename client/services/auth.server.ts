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

// refreshAPI
// export const serverRefreshToken = async () => {
//   console.log("serverRefreshToken CALLED");
//   try {
//     const cookieStore = await cookies();

//     const res = await fetch(`${API_URL}/auth/refresh`, {
//       method: "POST",
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     if (!res.ok) {
//       throw new Error(`refreshAPI:: Failed   ${res.status}`);
//     }

//     const data = res.headers.get("set-cookie")?.split(";")[0];
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// courses: [];
// createdAt: "2026-08-06T10:44:38.327Z";
// emailVerified: false;
// name: "guest-user";
// phone: "09330888181";
// refreshToken: "$2b$10$yzPMTR3/RT5pdx2vfr7F8OBynrtoLDfHt3ZsnfY8Ape13UfecqWdq";
// updatedAt: "2026-08-10T23:17:04.813Z";
// __v: 0;
// _id: "6a7465965d57a6a2aedcd26b";
