"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpEntrySchema } from "@/schemas/auth.schema";
import { otpVerifyAPI } from "@/services/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const VerifyRequestForm = () => {
  const form = useForm<z.infer<typeof otpEntrySchema>>({
    resolver: zodResolver(otpEntrySchema),
    defaultValues: { otpEntry: "" },
  });

  const onSubmit = async (data: z.infer<typeof otpEntrySchema>) => {
    console.log("onSubmit, data:", data);
    await otpVerifyAPI(data)
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="otpEntry"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col items-center justify-center space-y-2">
                <InputOTP
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

          <Button
            type="submit"
            id="otp-verification"
            className="w-full cursor-pointer"
          >
            Verify Account
          </Button>
        </FieldGroup>
      </form>
    </>
  );
};

export default VerifyRequestForm;
