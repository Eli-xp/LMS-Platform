"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { setUser } from "@/redux/slices/auth.slice";
import { otpEntrySchema } from "@/schemas/auth.schema";
import { login, otpVerify } from "@/services/auth/login.client-public";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const VerifyRequestForm = ({ phone }: { phone: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //// Send OTP Again Logic
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    // otherwise
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    form.reset();

    // Resend OTP Code
    console.log("RESENDDDDDDDDDD");
    if (phone) {
      ResendOTP();
    }
  };
  
  // func - ResendOTP
  const ResendOTP = async () => {
    try {
      const result: { message: string } = await login({ phone });
      toast.success("Verification code sent");
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  // form logic
  const form = useForm<z.infer<typeof otpEntrySchema>>({
    resolver: zodResolver(otpEntrySchema),
    defaultValues: { code: "", phone: phone },
  });

  // onSubmit func
  const onSubmit = async (data: z.infer<typeof otpEntrySchema>) => {
    try {
      // otpVerify - API call
      const result = await otpVerify(data);
      toast.success("Login Successfully");
      console.log(result);
      dispatch(setUser(result));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CardContent className="space-y-5 mt-1">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <InputOTP
                    autoFocus
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value.length === 6 && !form.formState.isSubmitting) {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    className="flex items-center justify-center"
                    id="otp-verification"
                    required
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="flex flex-row items-center justify-center">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="mx-2" />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </div>
                      <div>
                        {fieldState.invalid && (
                          <span className="text-red-600">
                            {fieldState.error?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </InputOTP>
                </div>
              )}
            />

            <div className="flex flex-col items-center justify-center">
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the 6-digit code sent to your email
              </p>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          disabled={countdown !== 0}
          onClick={handleResend}
          type="button"
          id="otp-verification"
          className="w-full cursor-pointer"
        >
          {countdown === 0 ? "Resend Code" : `Resend in ${countdown}`}
        </Button>
      </CardFooter>
    </>
  );
};

export default VerifyRequestForm;
