import { centralClientAPI } from "../central/central.client-public&user";

// login
export const logout = async () => {
  console.log("logout CALLED");

  const res = await centralClientAPI("/auth/logout", {
    method: "POST",
    cache: "no-store",
    auth: false,
  });

  console.log("logout api succesfully done!");

  const data = res?.json();
  console.log(data);
  return data;
};
