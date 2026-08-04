import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PhoneNumForm from "./_components/Login.form";

const LoginPage = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Weclome Back!</CardTitle>
          <CardDescription>
            Login with your Github Email Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PhoneNumForm />
        </CardContent>
        <CardContent className="flex flex-col gap-4">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button className="w-full" variant={"outline"}>
            <Image
              src="/GitHub_Invertocat_White.svg"
              alt="Github-logo"
              height={16}
              width={16}
            />
            Github
          </Button>
        </CardContent>
      </Card>

    </div>
  );
};
export default LoginPage;
