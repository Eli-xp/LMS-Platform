import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DeleteCourseButton from "./_components/DeleteCourseButton";

const courseDeletePage = () => {
  return (
    <div className="  min-h-screen">
      <Card className="max-w-xl mt-32 mx-auto">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>This action cannot be undone</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between space-x-2">
          <DeleteCourseButton />
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "cursor-pointer",
            })}
            href="/admin/courses"
          >
            Cancel
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default courseDeletePage;
