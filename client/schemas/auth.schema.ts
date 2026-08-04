import z from "zod";
export const loginSchema = z.object({
  phoneNum: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "Invalid phone number"),
});

export const otpEntrySchema = z.object({
  otpEntry: z
    .string()
    .length(6, "OTP Must contain 6 digits")
    .regex(/^\d+$/, "OTP Must contain only numbers"),
});
