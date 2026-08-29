"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  createLessonSchema,
  createLessonSchemaType,
} from "@/schemas/course.schema";
import { PostLesson } from "@/services/admin/course/lesson/PostLesson.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateLessonModal = ({ chapterId }: { chapterId: string }) => {
  console.log(chapterId);

  const [isOpen, setIsOpen] = useState(false);

  // Define form
  const form = useForm<createLessonSchemaType>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: "",
      chapterId: chapterId,
    },
  });

  const handleOpenChange = (open: boolean) => {
    console.log(open);
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  };

  const onSubmit = async (values: createLessonSchemaType) => {
    console.log("onSubmit ran for MODALLLLL");
    console.log(values);

    try {
      const res = await PostLesson(values);
      console.log(res);

      if (res === 201) {
        toast.success("Lesson Created");
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add lesson");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-center cursor-pointer"
            type="button"
          />
        }
      >
        <Plus className="size-4" /> Create New Lesson
      </DialogTrigger>
      <DialogContent className="sm:max-w-107">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            What would you like to name your lesson?
          </DialogDescription>
        </DialogHeader>
        <form id="lessonDialogId" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-title">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="lesson title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button
              disabled={form.formState.isSubmitting}
              className="cursor-pointer"
              type="submit"
            >
              {form.formState.isSubmitting ? "Saving.." : "Save Change"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLessonModal;
