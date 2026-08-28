"use client";

import { Trash2, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { deleteLessonSchemaType } from "@/schemas/course.schema";
import { DeleteLesson } from "@/services/admin/course/lesson/DeleteLesson.client-admin";

const DeleteLessonModal = ({ chapterId, lessonId }: deleteLessonSchemaType) => {
  console.log(chapterId);
  console.log(lessonId);

  const [pending, isPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    console.log(open);
    setIsOpen(open);
  };

  const onSubmit = async () => {
    console.log("onSubmit ran for MODALLLLL");
    isPending(true);

    try {
      const res = await DeleteLesson({ chapterId, lessonId });
      console.log(res);

      if (res === 200) {
        toast.success("Lesson Created");
        setIsOpen(false);
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
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        render={
          <Button type="button" variant="outline" size="icon">
            <Trash2 className="size-4" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Lesson?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this lesson.This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            onClick={onSubmit}
            variant="destructive"
            disabled={pending}
          >
            {pending ? "Deleting.." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLessonModal;
