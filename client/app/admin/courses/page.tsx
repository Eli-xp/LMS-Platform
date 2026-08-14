import { buttonVariants } from "@/components/ui/button";
// import { adminGetCourses } from "@/services/admin/adminGetCourses.api";
import Link from "next/link";
import AdminCourseCard from "./_components/AdminCourseCard";
import { adminGetCourses } from "@/schemas/course.schema";
import { sampleDataCourses } from "./sampleData";
import z from "zod";

// sample data
const data: z.infer<typeof adminGetCourses>[] = sampleDataCourses;

const CoursesPage = async () => {
  // const data = await adminGetCourses();
  console.log(data);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>
      <div>
        <span>Here you will see all of the courses</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
        {data.map((course) => (
          <AdminCourseCard key={course.id} {...course} />
        ))}
      </div>
    </>
  );
};

export default CoursesPage;
