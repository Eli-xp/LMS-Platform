"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import { sampleDataCourseStructure } from "./sapmleData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CourseStructure = () =>
  // { data }
  {
    const sampledata = sampleDataCourseStructure;

    console.log(sampledata);
    const initialCourse =
      sampledata?.chapters?.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        order: chapter.position,
        isOpen: true, // defaul chapters to open
        lessons: chapter.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          order: lesson.position,
        })),
      })) || [];

    const [course, setCourse] = useState(initialCourse);

    const toggleChapterFunc = (chapterId: string) => {
      console.log("toggleChapterFunc Ran");
      setCourse((prevItems) =>
        prevItems.map((chapter) =>
          chapter.id === chapterId
            ? { ...chapter, isOpen: !chapter.isOpen }
            : chapter,
        ),
      );
    };

    console.log(course);

    return (
      <DragDropProvider>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border">
            <CardTitle>Chapters</CardTitle>
          </CardHeader>
          <CardContent className="list">
            {/* chapters */}
            {course?.map((chapter, index) => (
              <SortableCourse
                key={chapter.id}
                id={chapter.id}
                chapter={chapter}
                index={index}
                courseId={course.id}
                toggleChapterFunc={toggleChapterFunc}
              />
            ))}
          </CardContent>
        </Card>
      </DragDropProvider>
    );
  };

export default CourseStructure;

function SortableCourse({ id, index, chapter, toggleChapterFunc, courseId }) {
  const { ref } = useSortable({ id: chapter.id, index });
  console.log(chapter);

  return (
    <Card ref={ref}>
      <Collapsible
        className="z-50"
        open={chapter.isOpen}
        onOpenChange={() => toggleChapterFunc(chapter.id)}
      >
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="flex opacity-60 hover:opacity-100"
            >
              <GripVertical className="size-4 cursor-pointer" />
            </Button>
            <CollapsibleTrigger
              className="flex items-center justify-center"
              render={<button />}
            >
              {chapter.isOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </CollapsibleTrigger>
            <p className="pl-2 cursor-pointer hover:text-primary ">
              {chapter.title}
            </p>
          </div>
          <Button size="icon" variant={"outline"} className="cursor-pointer">
            <Trash2 className="size-4" />
          </Button>
        </div>
        {/* lessons */}
        <CollapsibleContent>
          <div className="p-1">
            {chapter.lessons.map((lesson, index) => (
              <SortableLesson
                key={lesson.id}
                id={lesson.id}
                lesson={lesson}
                index={index}
                courseId={courseId}
                chapterId={chapter.id}
                toggleChapterFunc={toggleChapterFunc}
              />
            ))}
            <div className="p-2">
              <Button className="w-full" variant={"outline"}>
                Create New Lesson
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function SortableLesson({
  id,
  index,
  lesson,
  toggleChapterFunc,
  courseId,
  chapterId,
}) {
  const { ref } = useSortable({ id: lesson.id, index });

  return (
    <div
      ref={ref}
      className="z-50 flex items-center justify-between p-2 hover:bg-accent rounded-sm "
    >
      <div className="flex items-center gap-2">
        <Button type="button" variant={"ghost"} size={"icon"}>
          <GripVertical className="size-4" />
        </Button>
        <FileText className="size-4" />
        <Link href={`/admin/courses/${courseId}/${chapterId}/${lesson.id}`}>
          {lesson.title}
        </Link>
      </div>
      <Button variant={"outline"} size={"icon"}>
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
