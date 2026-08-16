import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CourseCreationForm from "./_components/CourseCreation.form";

const CourseCreationPage = () => {
  return (
    <>
      <div className="flex flex-row gap-4">
        <Link
          href="/admin/courses"
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h2 className="text-2xl font-bold">Create Courses</h2>
      </div>
      {/* Card containing form */}
      <CourseCreationForm />
    </>
  );
};

export default CourseCreationPage;
