import { adminGetCourse_basic } from "@/services/admin/course/GetCourse.server-admin";
import CourseBasicForm from "./CourseBasic.form";

const CourseStructureTab = async ({ courseId }: { courseId: string }) => {
  console.log(courseId);

  // Get course information by id
  let courseData;
  if (courseId) {
    try {
      console.log("adminGetCourse_structure called");
      const { data } = await adminGetCourse_basic(courseId);
      courseData = data;
      console.log(courseData);
    } catch (error) {
      console.error(error);
    }
  }

  return <CourseBasicForm course={courseData} />;
};

export default CourseStructureTab;
