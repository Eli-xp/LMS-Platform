import { adminGetLesson } from "@/services/admin/course/lesson/GetLesson.server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import EditLessonForm from "./_components/EditLesson.form";

type Params = Promise<{
  lessonId: string;
  courseId: string;
}>;

const LessonIdPage = async ({ params }: { params: Params }) => {
  const { lessonId, courseId } = await params;

  let lesson;
  try {
    lesson = await adminGetLesson(lessonId);
    console.log(lesson);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-6 " })}
        href={`/admin/courses/${courseId}/edit`}
      >
        <ArrowLeft className="size-4" />
        <span>Go Back</span>
      </Link>
      <EditLessonForm data={lesson} />
    </div>
  );
};

export default LessonIdPage;
