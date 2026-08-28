"use client";

import FileUploader from "@/components/file-uploader/FileUploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { adminCourseFileVerification } from "@/services/admin/course/CourseFileVerification.client-admin";
import { adminPutLesson } from "@/services/admin/course/lesson/PutLesson.client-admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditLessonForm = ({
  data,
  courseId,
  chapterId,
}: {
  data: getLessonSchemaType;
  courseId: string;
  chapterId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  console.log(data);
  console.log(courseId);
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

  // onSubmit Function
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

    // 0) if lesson's inputs changed & chapter id is available
    if (Object.keys(changedValues).length > 0 && chapterId) {
      console.log(changedValues);
      setIsSubmitting(true);

      // 1) if thumbnail & video changed
      if (
        "thumbnailObject" in changedValues &&
        "videoObject" in changedValues
      ) {
        // 1_1) edit course request
        console.log("CourseEditForm API:: thumbnail adn video changed");
        try {
          const { thumbnailObject, videoObject, ...rest } = changedValues;
          const changedValuesforserver = {
            ...rest,
            thumbnailObject: {
              originalname: thumbnailObject?.originalName,
              contentType: thumbnailObject?.contentType,
            },
            videoObject: {
              originalname: videoObject?.originalName,
              contentType: videoObject?.contentType,
            },
            chapterId,
          };

          console.log(changedValuesforserver);
          // backend request
          const editLessonRes = await adminPutLesson({
            changedValuesforserver,
            id: data._id,
          });
          console.log(editLessonRes);
          toast.info("Lesson Edit Requested");

          console.log("adminPostCourseVerification called");

          // send thumbnail
          const thumbnailPromisse = await adminCourseFileVerification({
            link: editLessonRes,
            file: values.thumbnailObject.file,
          });

          // send video
          const videoPromisse = await adminCourseFileVerification({
            link: editLessonRes.videoKey,
            file: values.videoObject.file,
          });

          const [thumbnailVerification, videoVerification] = await Promise.all([
            thumbnailPromisse,
            videoPromisse,
          ]);

          console.log(thumbnailVerification);
          console.log(videoVerification);

          // if storage 204
          if (
            thumbnailVerification.status === 204 &&
            videoVerification.status === 204
          ) {
            toast.success("Mission Successfull.");
            // Reset for inputs
            // form.reset();
            // Redirect to admin courses
            // router.replace("/admin/courses");
            setIsSubmitting(false);
          } else {
            console.error(thumbnailVerification);
            console.error(videoVerification);
            setIsSubmitting(false);
          }
        } catch (error) {
          console.error(error);
          setIsSubmitting(false);
        }
      }

      //   // 2) if thumbnail changed
      //   if ("thumbnail" in changedValues) {
      //     try {
      //       // 2_1) edit course request
      //       console.log("CourseEditForm API:: thumbnail changed");

      //       const { thumbnail, ...rest } = changedValues;
      //       const changedValuesforserver = {
      //         ...rest,
      //         thumbNail: {
      //           originalName: thumbnail?.originalName,
      //           contentType: thumbnail?.contentType,
      //         },
      //         size: thumbnail?.size,
      //       };

      //       const editCourseRes = await adminEditCourse_basic(
      //         // changed inputs
      //         changedValuesforserver,
      //         // lessonId
      //         id:data._id,
      //       );
      //       console.log(editCourseRes);
      //       toast.success("Course Edited Successfully");

      //       //
      //       console.log("adminPostCourseVerification called");
      //       const createCourseResverification = await adminCourseFileVerification(
      //         {
      //           link: editCourseRes,
      //           file: values.thumbnail.file,
      //         },
      //       );
      //       console.log(createCourseResverification);

      //       // if storage 204
      //       if (createCourseResverification.status === 204) {
      //         // Reset for inputs
      //         form.reset();
      //         // Redirect to admin courses
      //         router.replace("/admin/courses");
      //         setIsSubmitting(false);
      //       } else {
      //         console.error(createCourseResverification.status);
      //         setIsSubmitting(false);
      //       }
      //     } catch (error) {
      //       console.error(error);
      //       setIsSubmitting(false);
      //     }
      //   }

      // 2) if thumbnail did not change
      //   else {
      //     try {
      //       console.log("CourseEditForm API:: thumbnail did not change");
      //       setIsSubmitting(true);
      //       const editCourseRes = await adminEditCourse_basic(
      //         changedValues,
      //         course_id,
      //       );
      //       console.log(editCourseRes);
      //       toast.success("Course Edited Successfully");
      //       setIsSubmitting(false);
      //       router.replace("/admin/courses/");
      //     } catch (error) {
      //       console.error(error);
      //       setIsSubmitting(false);
      //     }
      //   }

      // if course had no change
    } else {
      toast.info("No change(s) spotted.");
    }
  };

  const CourseCancelEdit = () => {
    form.reset();
    router.replace("/admin/courses/");
  };

  return (
    <div>
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-6 " })}
        href={`/admin/courses/${courseId}/edit`}
      >
        <ArrowLeft className="size-4" />
        <span>Go Back</span>
      </Link>

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
                          (only 1 image max: 5mb - .png .jpg .jpeg )
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
                  Save Lesson
                </Button>
                <Button
                  variant={"destructive"}
                  type="button"
                  disabled={isSubmitting}
                  onClick={CourseCancelEdit}
                  className="cursor-pointer w-full"
                >
                  Cancel <X size={16} />
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLessonForm;
