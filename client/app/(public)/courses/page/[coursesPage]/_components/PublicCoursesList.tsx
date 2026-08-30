import { PublicGetCourseType } from "@/schemas/public/course.schema";
import { PublicGetCourses_API } from "@/services/public/course/GetCourses.server";
import PublicCourseCard from "./PublicCourseCard";
import PublicCoursesPagination from "./PublicCoursesPagination";

export const PublicCoursesList = async ({
  currentPageNum,
}: {
  currentPageNum: number;
}) => {
  console.log(currentPageNum);
  console.log(typeof currentPageNum);
  let coursesData;

  try {
    const res: PublicGetCourseType = await PublicGetCourses_API(currentPageNum);
    console.log(res);
    coursesData = res;
  } catch (error) {
    console.error(error);
  }
console.log(coursesData)
  return (
    <>
      {coursesData?.courses?.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2    lg:grid-cols-3 gap-6">
          {coursesData.courses.map((course) => (
            <PublicCourseCard key={course._id} {...course} />
          ))}
        </div>
      )}

      {/*  courses pagination */}
      {coursesData?.pageCount > 1 && (
        <PublicCoursesPagination
          currentPage={currentPageNum}
          totalPage={coursesData?.pageCount}
        />
      )}
    </>
  );
};
