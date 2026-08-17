// login
export const logout = async () => {
  console.log("login CALLED");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to Logout");
  }

  console.log("logout api succesfully done!");

  console.log(res);
  return res;
};
