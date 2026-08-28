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
import { createChapterSchema } from "@/schemas/course.schema";
import { PostChapter } from "@/services/admin/course/chapter/PostChapter.client-admin";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CreateChapterModal = ({ courseId }: { courseId: string }) => {
  console.log(courseId);

  const [isOpen, setIsOpen] = useState(false);

  // Define form
  const form = useForm<z.infer<typeof createChapterSchema>>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      courseId: courseId,
    },
  });

  const handleOpenChange = (open: boolean) => {
    console.log(open);
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  };

  const onSubmit = async (values: z.infer<typeof createChapterSchema>) => {
    console.log("onSubmit ran for MODALLLLL");
    console.log(values);

    try {
      const res = await PostChapter(values);
      console.log(res);

      if (res === 201) {
        toast.success("Chapter Created");
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add chapter");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" type="button" />}>
        <Plus className="size-4" /> New Chapter
      </DialogTrigger>
      <DialogContent className="sm:max-w-107">
        <DialogHeader>
          <DialogTitle>Create New Chapter</DialogTitle>
          <DialogDescription>
            What would you like to name your chapter?
          </DialogDescription>
        </DialogHeader>
        <form id="chapterDialogId" onSubmit={form.handleSubmit(onSubmit)}>
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
                    placeholder="chapter title"
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

export default CreateChapterModal;
