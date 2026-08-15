"use client";
import { adminGetCourse } from "@/services/admin/adminGetCourse.api";
import { useParams } from "next/navigation";

const courseEditPage = () => {
  // const { courseId } = await params
  const { courseId } = useParams<{ courseId: string }>();
  if (courseId) {
    // Get course information by id
    const courseEditCall = async () => {
      try {
        const data = await adminGetCourse(courseId);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    return data;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit Course:{" "}
        <span className="text-primary underline">{data?.title}</span>
      </h1>
    </div>
  );
};

export default courseEditPage;
