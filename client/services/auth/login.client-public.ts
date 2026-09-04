// Handles login - otpVerify
import z from "zod";
import { loginSchema, otpEntrySchema } from "@/schemas/auth.schema";
import { centralClientAPI } from "../central/central.client-public&user";

// login
export const login = async (data: z.infer<typeof loginSchema>) => {
  console.log("login CALLED");

  const res = await centralClientAPI("/auth/sendOtp", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
    auth: false,
  });

  return await res?.json();
};

// otpVerify
export const otpVerify = async (data: z.infer<typeof otpEntrySchema>) => {
  console.log("otpVerifyAPI CALLED, DATA:", data);

  const res = await centralClientAPI("/auth/verifyOtp", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
    auth: false,
  });

  return await res?.json();
};
