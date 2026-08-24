import { adminGetCourse_structure } from "@/services/admin/course/GetCourse.server-admin";
import CourseStructureForm from "./CourseStructure.form";

const CourseStructureTab = async ({ courseId }: { courseId: string }) => {
  let courseStructure;

  try {
    console.log("adminGetCourse_structure called");
    const { data } = await adminGetCourse_structure(courseId);
    courseStructure = data;
    console.log(courseStructure);
  } catch (error) {
    console.error(error);
  }

  return <CourseStructureForm courseStructure={courseStructure} />;
};

export default CourseStructureTab;
