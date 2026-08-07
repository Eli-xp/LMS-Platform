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
import { otpVerify } from "@/services/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const VerifyRequestForm = ({ phone }: { phone: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof otpEntrySchema>>({
    resolver: zodResolver(otpEntrySchema),
    defaultValues: { code: "", phone: phone },
  });

  const onSubmit = async (data: z.infer<typeof otpEntrySchema>) => {
    try {
      const result = await otpVerify(data);
      toast.success("Login Successfully");

      console.log(result);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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

        <Button
          type="submit"
          id="otp-verification"
          className="w-full cursor-pointer"
        >
          Verify Account
        </Button>
      </FieldGroup>
    </form>
  );
};

export default VerifyRequestForm;
