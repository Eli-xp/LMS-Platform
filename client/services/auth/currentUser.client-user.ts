import { centralClientAPI } from "../central/central.client-public&user";

export const getCurrentUserOnClient = async () => {
  console.log("getCurrentUserOnClient ran");

  const res = await centralClientAPI("/auth/me", {
    method: "GET",
    redirectOnAuthFailure: false,
  });

  // Handle redirectOnAuthFailure
  if (res.status === 401) {
    return null;
  }

  const data = await res?.json();
  console.log(data);
  return data;
};
