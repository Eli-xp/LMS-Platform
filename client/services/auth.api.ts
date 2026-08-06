import z from "zod";
import { loginSchema, otpEntrySchema } from "@/schemas/auth.schema";

export const login = async (data: z.infer<typeof loginSchema>) => {
  console.log("loginAPI CALLED, DATA:", data);

  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      //   headers: { "Content-type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failde to Login");
    }

    const loginInfo = await res.json();
    console.log(loginInfo);
    return loginInfo;
  } catch (error) {
    console.error(error);
  }
};

export const otpVerify = async (data: z.infer<typeof otpEntrySchema>) => {
  console.log("otpVerifyAPI CALLED, DATA:", data);

  try {
    const res = await fetch("/auth/otp-verify", {
      method: "POST",
      body: JSON.stringify(data),
      //   headers: { "Content-type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failde to Verify OTP");
    }

    const loginInfo = await res.json();
    console.log(loginInfo);
    return loginInfo;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (data) => {
  try {
    const res = await fetch("/auth/logout", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to logout");
    }

    const logoutInfo = await res.json();
    console.log(logoutInfo);
    return logoutInfo;
  } catch (error) {
    console.error(error);
  }
};
