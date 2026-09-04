import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyRequestForm from "./_components/VerifyRequest.form";

const verifyRequestPage = async ({
  searchParams,
}: {
  searchParams: { phone?: string };
}) => {
  const { phone = "" } = await searchParams;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Vertify your login{" "}
          </CardTitle>
          <CardDescription className="px-10 pt-2">
            Enter verification code we sent to your <br /> phone number: {phone}
          </CardDescription>
        </CardHeader>
        {/* Form & Btn */}
        <VerifyRequestForm phone={phone} />
      </Card>
    </div>
  );
};

export default verifyRequestPage;
