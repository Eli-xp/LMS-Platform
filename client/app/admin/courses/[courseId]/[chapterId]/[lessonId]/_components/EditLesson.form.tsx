"use client";

import FileUploader from "@/components/file-uploader/FileUploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  getLessonSchemaType,
  updateLessonSchema,
  updateLessonSchemaType,
} from "@/schemas/course.schema";
import { adminCourseFileVerification } from "@/services/admin/course/CourseFileVerification.client";
import { adminPutLesson } from "@/services/admin/course/lesson/PutLesson.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditLessonForm = ({ data }: { data: getLessonSchemaType }) => {
  const { chapterId } = useParams<{
    chapterId: string;
  }>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  console.log(data);
  console.log(chapterId);

  // Define form
  const form = useForm<updateLessonSchemaType>({
    resolver: zodResolver(updateLessonSchema),
    defaultValues: {
      title: data.title,
      description: data.description ?? undefined,
      videoObject: data.videoKey ?? {
        originalName: undefined,
        contentType: undefined,
        file: undefined,
      },
      thumbnailObject: data.thumbnailKey ?? {
        originalName: undefined,
        contentType: undefined,
        file: undefined,
        size: 0,
      },
      chapterId: data.chapterId,
      _id: data._id,
    },
  });
  const { dirtyFields, isDirty } = form.formState;

  //// onSubmit Function
  const onSubmit = async (values: updateLessonSchemaType) => {
    console.log("onSubmit ran");
    console.log(dirtyFields);
    console.log(isDirty);
    console.log(values);

    console.log(form.formState.dirtyFields);
    // create changed vlaues object
    const changedValues = Object.keys(form.formState.dirtyFields).reduce(
      (acc, key) => {
        acc[key] = values[key as keyof typeof values];
        return acc;
      },
      {} as Partial<typeof values>,
    );
    console.log(changedValues);

    //// Validation
    if (!chapterId) {
      toast.error("chapter ID is missing.");
      return;
    }
    if (Object.keys(changedValues).length === 0) {
      console.log(changedValues);
      toast.info("No Changes Spotted.");
      return;
    }
    setIsSubmitting(true);

    try {
      //// Detect Changed Media
      const thumbnailChanged = "thumbnailObject" in changedValues;
      const videoChanged = "videoObject" in changedValues;
      const hasMediaChange = thumbnailChanged || videoChanged;

      //// Build sever paylaod
      const { thumbnailObject, videoObject, ...rest } = changedValues;
      const changedValuesforserver = {
        ...rest,
        chapterId,
        ...(thumbnailChanged && {
          thumbnailObject: {
            originalname: thumbnailObject?.originalName,
            contentType: thumbnailObject?.contentType,
          },
        }),
        ...(videoChanged && {
          videoObject: {
            originalname: videoObject?.originalName,
            contentType: videoObject?.contentType,
          },
        }),
      };

      //// Update lesson - backend request
      toast.info("Lesson Edit Requested.");
      const editLessonRes = await adminPutLesson({
        changedValuesforserver,
        id: data._id,
      });
      console.log(editLessonRes);

      //// Upload Changed media(if needed)
      if (hasMediaChange) {
        const uploadPromises: Promise<Response>[] = [];
        if (thumbnailChanged && values.thumbnailObject.file) {
          uploadPromises.push(
            adminCourseFileVerification({
              link: editLessonRes.result,
              file: values.thumbnailObject.file,
            }),
          );
        }
        if (videoChanged && values.videoObject.file) {
          uploadPromises.push(
            adminCourseFileVerification({
              link: editLessonRes.result.videoKey,
              file: values.videoObject.file,
            }),
          );
        }

        // All changed files upload in parallel.
        const uploadResults = await Promise.all(uploadPromises);

        //// Verify upload result
        const uploadFailed = uploadResults.some(
          (result) => result.status !== 204,
        );
        if (uploadFailed) {
          console.error("Media upload failed", uploadResults);
          toast.error("Some Files failed to upload");
          return;
        }
      }

      ////  Success
      toast.success("Lesson edited successfully");
      router.replace("/admin/courses/page/1");
    } catch (error) {
      console.error("Edit lesson failed", error);
      toast.error("Failed to edit lesson");
    } finally {
      setIsSubmitting(false);
    }
  };

  //// cancel course edit
  const handleCancelEdit = () => {
    form.reset();
    router.replace("/admin/courses/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Configuration</CardTitle>
        <CardDescription>
          Configure the video adn description for this lesson.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="CourseEditFormID"
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log("VALIDATION ERRORS:", error, form.getValues());
          })}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">
                    Lesson Name<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    inputMode="text"
                    type="text"
                    placeholder="Complete Next.js 16 Course"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RichTextEditor field={field} filedLabel={"Description"} />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="thumbnailObject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="thumbnailObject">
                    Thumbnail Image
                    <span className="text-destructive">
                      *{" "}
                      <span className="text-muted-foreground text-xs">
                        (only 1 image max: 5mb - .png .jpg .jpeg )
                      </span>
                    </span>
                  </FieldLabel>
                  <FileUploader
                    initialURL={data.thumbnailKey}
                    onFileChange={field.onChange}
                    filTypeAccepted="image"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="videoObject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="videoObject">
                    Video
                    <span className="text-destructive">
                      *{" "}
                      <span className="text-muted-foreground text-xs">
                        (only 1 video max: 5mb - .mp4 .webm .mov )
                      </span>
                    </span>
                  </FieldLabel>
                  <FileUploader
                    initialURL={data.videoKey}
                    onFileChange={field.onChange}
                    filTypeAccepted="video"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* form submit button */}
            <div className="w-full grid grid-cols-2">
              <Button
                type="submit"
                form="CourseEditFormID"
                disabled={isSubmitting}
                className="cursor-pointer w-full"
              >
                {isSubmitting ? "Saving.." : "Save Lesson"}
              </Button>
              <Button
                variant={"destructive"}
                type="button"
                disabled={isSubmitting}
                onClick={handleCancelEdit}
                className="cursor-pointer w-full"
              >
                Cancel <X size={16} />
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditLessonForm;
