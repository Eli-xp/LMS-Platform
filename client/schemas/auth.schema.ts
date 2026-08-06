import z from "zod";
export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "Invalid phone number"),
});

export const otpEntrySchema = z.object({
  code: z
    .string()
    .length(6, "OTP Must contain 6 digits")
    .regex(/^\d+$/, "OTP Must contain only numbers"),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "Invalid phone number"),
});
