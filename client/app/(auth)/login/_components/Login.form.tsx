"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth.schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { login } from "@/services/auth/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PhoneNumForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result: { message: string } = await login(data);
      toast.success("Verification code sent");
      router.push(`/verify-request?phone=${data.phone}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="loginFormID" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="loginPhone">Phone Number</FieldLabel>
              <Input
                {...field}
                id="loginPhone"
                aria-invalid={fieldState.invalid}
                inputMode="numeric"
                type="tel"
                placeholder="09173728290"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          form="loginFormID"
          disabled={form.formState.isSubmitting}
          className="cursor-pointer"
        >
          Login
        </Button>
      </FieldGroup>
    </form>
  );
};

export default PhoneNumForm;
