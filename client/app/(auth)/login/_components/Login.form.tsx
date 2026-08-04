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
import { loginAPI } from "@/services/auth.api";

const PhoneNumForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNum: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await loginAPI(data);
  };

  return (
    <form id="myFooorm" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="phoneNum"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="loginPhoneNum">Phone Number</FieldLabel>
              <Input
                {...field}
                id="loginPhoneNum"
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
          form="myFooorm"
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
