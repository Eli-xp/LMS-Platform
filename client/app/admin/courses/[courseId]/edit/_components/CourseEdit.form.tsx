"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  courseCategories,
  courseLevels,
  courseStatus,
  AdminGetCourseSchema,
} from "@/schemas/course.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SparkleIcon, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import slugify from "slugify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import FileUploader from "@/components/file-uploader/FileUploader";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminEditCourse } from "@/services/admin/course/adminEditCourse.api";
import { adminCourseFileVerification } from "@/services/admin/course/adminCourseFileVerification.api";

const CourseEditForm = ({
  course,
}: {
  course: z.infer<typeof AdminGetCourseSchema>;
}) => {
  const [initialFile, setInitialFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // redirect on client side
  const router = useRouter();

  // Define form
  const form = useForm<z.infer<typeof AdminGetCourseSchema>>({
    resolver: zodResolver(AdminGetCourseSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      category: course.category,
      description: course.description,
      smallDescription: course.smallDescription,
      thumbnail: course.thumbnail,
      price: course.price,
      duration: course.duration,
      level: course.level,
      status: course.status,
      _id: course._id,
    },
  });

  // onSubmit Function
  const onSubmit = async (values: z.infer<typeof AdminGetCourseSchema>) => {
    console.log("onSubmit ran");

    const course_id = values._id;

    // create changed vlaues object
    const changedValues = Object.keys(form.formState.dirtyFields).reduce(
      (acc, key) => {
        acc[key] = values[key as keyof typeof values];
        return acc;
      },
      {} as Partial<typeof values>,
    );
    console.log(changedValues);

    // 0) if course changed & course id was available
    if (Object.keys(changedValues).length > 0 && course_id) {
      console.log(changedValues);
      setIsSubmitting(true);

      // 1) if thumbnail also changed
      if ("thumbnail" in changedValues) {
        try {
          // 1_1) edit course request
          console.log("CourseEditForm API:: thumbnail changed");

          const { thumbnail, ...rest } = changedValues;
          const changedValuesforserver = {
            ...rest,
            thumbNail: {
              originalName: thumbnail?.originalName,
              contentType: thumbnail?.contentType,
            },
            size: thumbnail?.size,
          };

          const editCourseRes = await adminEditCourse(
            changedValuesforserver,
            course_id,
          );
          console.log(editCourseRes);
          toast.success("Course Edited Successfully");

          //
          console.log("adminPostCourseVerification called");
          const createCourseResverification = await adminCourseFileVerification(
            {
              link: editCourseRes,
              file: values.thumbnail.file,
            },
          );
          console.log(createCourseResverification);

          // if storage 204
          if (createCourseResverification.status === 204) {
            // Reset for inputs
            form.reset();
            // Redirect to admin courses
            router.replace("/admin/courses");
            setIsSubmitting(false);
          } else {
            console.error(createCourseResverification.status);
            setIsSubmitting(false);
          }
        } catch (error) {
          console.error(error);
          setIsSubmitting(false);
        }

        // 2) if thumbnail did not change
      } else {
        try {
          console.log("CourseEditForm API:: thumbnail did not change");
          setIsSubmitting(true);
          const editCourseRes = await adminEditCourse(changedValues, course_id);
          console.log(editCourseRes);
          toast.success("Course Edited Successfully");
          setIsSubmitting(false);
          router.replace("/admin/courses/");
        } catch (error) {
          console.error(error);
          setIsSubmitting(false);
        }
      }

      // if course had no change
    } else {
      toast.info("No change(s) spotted.");
    }
  };

  const CourseCancelEdit = () => {
    form.reset();
    router.replace("/admin/courses/");
  };

  // Generate slug function
  const generateSlug = () => {
    const titleValue = form.getValues("title");
    if (titleValue) {
      const slug = slugify(titleValue, { lower: true, strict: true });
      console.log(slug);

      form.setValue("slug", slug, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      toast.error("Enter The Title Please.");
    }
  };
  console.log(course.thumbnail);

  return (
    <form
      id="CourseEditFormID"
      onSubmit={form.handleSubmit(onSubmit, (error) => {
        console.log("VALIDATION ERRORS:", error);
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
                Title<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                inputMode="text"
                type="text"
                placeholder="Complete Next.js 16 Course"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="slug">
                Slug<span className="text-destructive">*</span>
              </FieldLabel>
              <div className="flex items-end justify-center gap-4">
                <Input
                  {...field}
                  id="slug"
                  aria-invalid={fieldState.invalid}
                  inputMode="text"
                  type="text"
                  placeholder="complete-nextjs-16-courses"
                />
                <Button
                  type="button"
                  className="w-fit cursor-pointer"
                  onClick={generateSlug}
                >
                  Gernerate Slug <SparkleIcon size={16} className="ml-1" />
                </Button>
              </div>

              {fieldState.invalid && (
                <>
                  <FieldError errors={[fieldState.error]} />
                </>
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="smallDescription"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="smallDescription">
                Small Description<span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                {...field}
                id="smallDescription"
                aria-invalid={fieldState.invalid}
                inputMode="text"
                placeholder="complete-nextjs-16-courses"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="thumbnail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="thumbnail">
                Thumbnail Image
                <span className="text-destructive">
                  *{" "}
                  <span className="text-muted-foreground text-xs">
                    (only 1 image max: 5mb - .png .jpg .jpeg )
                  </span>
                </span>
              </FieldLabel>
              <FileUploader
                initialURL={course.thumbnail}
                onFileChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category">
                  Category<span className="text-destructive">*</span>
                </FieldLabel>

                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  id="category"
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="select a category" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectGroup>
                      {courseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="level"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel htmlFor="level">
                  Level<span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  id="level"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="select a level" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectGroup>
                      {courseLevels.map((courseLevels) => (
                        <SelectItem key={courseLevels} value={courseLevels}>
                          {courseLevels}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="duration">
                  Duration (hours)
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="duration"
                  aria-invalid={fieldState.invalid}
                  inputMode="numeric"
                  type="number"
                  placeholder="Enter duration"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">
                  Price ($)<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="price"
                  aria-invalid={fieldState.invalid}
                  inputMode="numeric"
                  type="number"
                  placeholder="Enter price"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel htmlFor="status">
                Status<span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                id="status"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    {courseStatus.map((courseStatus) => (
                      <SelectItem key={courseStatus} value={courseStatus}>
                        {courseStatus}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* form submit button */}
        <div className="w-full grid grid-cols-2">
          <Button
            type="submit"
            form="CourseEditFormID"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer w-full"
          >
            Edit <PlusIcon size={16} />
          </Button>
          <Button
            variant={"destructive"}
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={CourseCancelEdit}
            className="cursor-pointer w-full"
          >
            Cancel <X size={16} />
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default CourseEditForm;
