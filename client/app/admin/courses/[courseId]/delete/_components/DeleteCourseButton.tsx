"use client";

import { Button } from "@/components/ui/button";
import { DeleteCourse } from "@/services/admin/course/lesson/DeleteCourse.client-admin";
import { Loader2, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeleteCourseButton = () => {
  // get course id from params in client component using useParams()
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  console.log(courseId);

  const [pending, isPending] = useState(false);

  const onSubmit = async () => {
    console.log("onSubmit ran");
    isPending(true);

    try {
      const res = await DeleteCourse({ id: courseId });
      console.log(res);

      if (res === 200) {
        toast.success("Course Deleted");
        router.replace("/admin/courses/page/1");
        isPending(false);
      }

      isPending(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add lesson");
      isPending(false);
    }
  };

  return (
    <Button
      disabled={pending}
      type="submit"
      variant={"destructive"}
      onClick={onSubmit}
      className="cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Deleting..
        </>
      ) : (
        <>
          <Trash2 className="size-4" />
          Delete
        </>
      )}
    </Button>
  );
};

export default DeleteCourseButton;
