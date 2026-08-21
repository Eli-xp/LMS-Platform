// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function POST() {
//   const cookieStore = await cookies();

//   console.log(cookieStore);

//   const response = await fetch(`${API_URL}/auth/refresh`, {
//     method: "POST",
//     headers: { Cookie: cookieStore.toString() },
//   });

//   if (!response.ok) {
//     return NextResponse.json(
//       { message: "Refresh Failed" },
//       { status: response.status },
//     );
//   }

//   const setCookie = response.headers.get("set-cookie");

//   const nextResponse = NextResponse.json({
//     success: true,
//   });

//   if (setCookie) {
//     nextResponse.headers.set("set-cookie", setCookie);
//   }

//   console.log(setCookie);
//   console.log(nextResponse);

//   return nextResponse;
// }
