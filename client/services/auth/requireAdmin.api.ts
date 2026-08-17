"server-only";
import { redirect } from "next/navigation";
import { getCurrentUserOnServer } from "./server.api";

export const requireAdmin = async () => {
  console.log("requireAdmin Ran!!!");
  const { user } = await getCurrentUserOnServer();
  console.log(user);
  if (!user) {
    return redirect("/login");
  }

  // authorization on client-side
  console.log(user?.role);
  if (user.role !== "Admin") {
    console.log("requireAdmin:: Redicrected");
    return redirect("/not-admin");
  }

  return;
};
