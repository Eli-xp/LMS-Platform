import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-10 left-10",
        })}
      >
        <ArrowLeft className="size-4" />

        <span>Back</span>
      </Link>

      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/"
          className="flex flex-row justify-center items-center mx-auto gap-1"
        >
          <Image src="/logo.svg" alt="website-logo" width={36} height={36} />
          <span className="text-lg">MarshalLMS.</span>
        </Link>
        {children}
        <p className="text-xs text-center px-8 text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="cursor-pointer hover:underline text-destructive">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="cursor-pointer hover:underline text-destructive">
            Privacy Plicy.
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
