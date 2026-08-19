import { adminGetCourses } from "@/services/admin/course/adminGetCourses.api";
import AdminCourseCard from "./AdminCourseCard";

export const CoursesList = async () => {
  // await Promise(())
  let data;
  try {
    data = await adminGetCourses();
    console.log(data);
    // return data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {data?.length > 0 &&
        data?.map((course) => <AdminCourseCard key={course._id} {...course} />)}
    </div>
  );
};
