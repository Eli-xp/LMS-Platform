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
  courseSchema,
  courseStatus,
} from "@/schemas/course.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SparkleIcon } from "lucide-react";
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

const CourseCreationForm = () => {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "Web Development",
      description: "",
      smallDescription: "",
      thumbNail: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      status: "Draft",
    },
  });

  const onSubmit = async (values: z.infer<typeof courseSchema>) => {
    console.log("onSubmit ran");
    console.log(values);
  };

  const generateSlug = () => {
    const titleValue = form.getValues("title");
    if (titleValue) {
      const slug = slugify(titleValue, { lower: true, strict: true });

      console.log(slug);
    } else {
      toast.error("Enter The Title Please.");
    }
  };

  return (
    <form
      id="CourseCreationFormID"
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
          name="thumbNail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="thumbNail">
                Thumbnail Image
                <span className="text-destructive">
                  *{" "}
                  <span className="text-muted-foreground text-xs">
                    (only 1 image max: 5mb - .png .jpg .jpeg )
                  </span>
                </span>
              </FieldLabel>
              <FileUploader onFileChange={field.onChange} />
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
                  Duration (hours)<span className="text-destructive">*</span>
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
        <div>
          <Button
            type="submit"
            form="CourseCreationFormID"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            Create Course <PlusIcon className="ml-1" size={16} />
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default CourseCreationForm;
