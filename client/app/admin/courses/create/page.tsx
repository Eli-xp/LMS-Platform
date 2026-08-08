import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card>
        <CardHeader>
          <CardTitle>Basic info</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CourseCreationForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CourseCreationPage;
