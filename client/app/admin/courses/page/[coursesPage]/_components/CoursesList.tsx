import { adminGetCourses } from "@/services/admin/course/GetCourses.server-admin";
import AdminCourseCard from "./AdminCourseCard";
import z from "zod";
import CoursesPagination from "./CoursesPagination";

export const CoursesList = async ({
  currentPageNum,
}: {
  currentPageNum: number;
}) => {
  console.log(currentPageNum);
  console.log(typeof currentPageNum);
  let coursesData;

  try {
    const res: z.infer<typeof adminGetCourses> =
      await adminGetCourses(currentPageNum);
    console.log(res);
    coursesData = res;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
        {coursesData?.courses?.length > 0 &&
          coursesData.courses.map((course) => (
            <AdminCourseCard key={course._id} {...course} />
          ))}
      </div>

      {/*  courses pagination */}
      <CoursesPagination
        currentPage={currentPageNum}
        totalPage={coursesData?.pageCount}
      />
    </>
  );
};
