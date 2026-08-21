import { centralServerAPI } from "../central/central.server-public&user";

export const getCurrentUserOnServer = async () => {
  console.log("getCurrentUserOnServer CALLED");

  try {
    const res = await centralServerAPI("/auth/me", {
      method: "GET",
    });

    console.log(res);

    if (!res.ok) {
      // console.error(res.status);
      return {
        user: null,
      };
    }

    const data = await res.json();
    console.log(data);
    console.log("getCurrentUserOnServer Successfully!");
    return { user: data };
  } catch (error) {
    console.error(error);
    return {
      user: null,
    };
  }
};
