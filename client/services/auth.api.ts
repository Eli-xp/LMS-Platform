import z from "zod";
import { loginSchema, otpEntrySchema } from "@/schemas/auth.schema";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sendOtp`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failde to Login");
  }

  return await res.json();
};

export const otpVerify = async (data: z.infer<typeof otpEntrySchema>) => {
  console.log("otpVerifyAPI CALLED, DATA:", data);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifyOtp`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failde to Verify OTP");
  }

  return await res.json();
};
