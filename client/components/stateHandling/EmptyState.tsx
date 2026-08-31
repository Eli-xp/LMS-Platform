import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface EmptyStateType {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: EmptyStateType) => {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center border-dashed border p-8 text-center animate-in rounded-md">
      <div className="bg-primary/10 p-3 rounded-full">
        <Ban className="size-10 text-primary " />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground">
        {description}
      </p>
      <Link href={href ?? "/"} className={buttonVariants()}>
        <PlusCircle className="size-4 mr-2" />
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;
