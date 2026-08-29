import { adminGetCourses } from "@/services/admin/course/GetCourses.server";
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
    coursesData?.courses?.length > 0 && (
      <>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {coursesData.courses.map((course) => (
            <AdminCourseCard key={course._id} {...course} />
          ))}
        </div>

        <CoursesPagination
          currentPage={currentPageNum}
          totalPage={coursesData?.pageCount}
        />
      </>
    )
  );
};
