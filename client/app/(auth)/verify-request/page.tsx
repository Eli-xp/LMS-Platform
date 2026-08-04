import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import VerifyRequestForm from "./_components/VerifyRequest.form";

const verifyRequestPage = () => {
  const verificationPhoneNum = 111;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Vertify your login{" "}
          </CardTitle>
          <CardDescription className="px-10 pt-2">
            Enter verification code we sent to your <br /> phone number:{" "}
            {verificationPhoneNum}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <VerifyRequestForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default verifyRequestPage;
