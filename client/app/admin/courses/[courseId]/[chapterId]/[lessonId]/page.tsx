import { adminGetLesson } from "@/services/admin/course/lesson/GetLesson.server-admin";
import EditLessonForm from "./_components/EditLesson.form";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

const LessonIdPage = async ({ params }: { params: Params }) => {
  const { lessonId, courseId, chapterId } = await params;
  let lesson;
  try {
    lesson = await adminGetLesson(lessonId);
    console.log(lesson);
  } catch (error) {
    console.error(error);
  }

  return (
    <EditLessonForm data={lesson} courseId={courseId} chapterId={chapterId} />
  );
};

export default LessonIdPage