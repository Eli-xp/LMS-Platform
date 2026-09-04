import { centralClientAPI } from "../central/central.client-public&user";

export const getCurrentUserOnClient = async () => {
  console.log("getCurrentUserOnClient ran");

  const res = await centralClientAPI("/auth/me", {
    method: "GET",
  });

  const data = await res?.json();
  console.log(data);
  return data;
};
