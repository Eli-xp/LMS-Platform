import { adminGetCourses } from "@/services/admin/course/GetCourses.server-admin";
import AdminCourseCard from "./AdminCourseCard";

export const CoursesList = async () => {
  // await Promise(())
  let coursesData;
  try {
    const { data } = await adminGetCourses();
    coursesData = data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {coursesData?.length > 0 &&
        coursesData?.map((course) => (
          <AdminCourseCard key={course._id} {...course} />
        ))}
    </div>
  );
};
