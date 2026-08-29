"use client";

import Link from "next/link";
import { useState } from "react";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable, useSortable } from "@dnd-kit/react/sortable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";

import {
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
} from "lucide-react";
import { adminEditCourse_structure } from "@/services/admin/course/EditCourse.client";
import { toast } from "sonner";
import CreateLessonModal from "./CreateLesson.modal";
import CreateChapterModal from "./CreateChapter.modal";
import DeleteChapterModal from "./DeleteChapter.modal";
import DeleteLessonModal from "./DeleteLesson.modal";

// types
interface LessonState {
  _id: string;
  title: string;
  order: number;
}

interface ChapterState {
  _id: string;
  title: string;
  order: number;
  isOpen: boolean;
  lessons: LessonState[];
}

interface CourseStructureFormProps {
  courseStructure: {
    _id: string;
    chapters?: Array<{
      _id: string;
      title: string;
      position: number;
      lessons?: Array<{
        _id: string;
        title: string;
        position: number;
      }>;
    }>;
  };
}

interface SortableCourseProps {
  chapter: ChapterState;
  index: number;
  courseId: string;
  toggleChapter: (chapterId: string) => void;
}

interface SortableLessonProps {
  lesson: LessonState;
  index: number;
  courseId: string;
  chapterId: string;
}

const CourseStructureForm = ({ courseStructure }: CourseStructureFormProps) => {
  console.log(courseStructure);
  const { _id: courseId, chapters: initialChapters } = courseStructure;

  // initial changes
  const [chapters, setChapters] = useState<ChapterState[]>(() =>
    [...(initialChapters ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((chapter) => ({
        _id: chapter._id,
        title: chapter.title,
        order: chapter.position,
        isOpen: true,

        lessons: [...(chapter.lessons ?? [])]
          .sort((a, b) => a.position - b.position)
          .map((lesson) => ({
            _id: lesson._id,
            title: lesson.title,
            order: lesson.position,
          })),
      })),
  );

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // chapter toggle
  const toggleChapter = (chapterId: string) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter._id === chapterId
          ? {
              ...chapter,
              isOpen: !chapter.isOpen,
            }
          : chapter,
      ),
    );
  };

  // drag over
  const handleDragOver = (event: any) => {
    const { source } = event.operation;

    if (!isSortable(source)) {
      return;
    }

    const { type, initialGroup, group } = source;

    // Lessons are NOT allowed to move between chapters.
    if (type === "lesson" && initialGroup !== group) {
      event.preventDefault();
    }
  };

  // drag end
  const handleDragEnd = (event: any) => {
    if (event.canceled) {
      return;
    }

    const { source } = event.operation;

    if (!isSortable(source)) {
      return;
    }

    const { type, initialIndex, index, initialGroup, group } = source;

    if (initialGroup == null || group == null) {
      return;
    }

    // chapter reorder
    if (
      type === "chapter" &&
      initialGroup === "chapters" &&
      group === "chapters"
    ) {
      if (initialIndex === index) {
        return;
      }

      setChapters((prev) => move(prev, event));

      setIsDirty(true);

      return;
    }

    // LESSON REORDER - Only reorder when the lesson remains inside the same chapter.
    if (type === "lesson" && initialGroup === group) {
      if (initialIndex === index) {
        return;
      }

      setChapters((prev) =>
        prev.map((chapter) => {
          const chapterGroup = `chapter:${chapter._id}`;

          if (chapterGroup !== group) {
            return chapter;
          }

          return {
            ...chapter,
            lessons: move(chapter.lessons, event),
          };
        }),
      );

      setIsDirty(true);
    }
  };

  // save changes
  const handleSave = async () => {
    if (!isDirty || isSaving) {
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        courseId,

        chapters: chapters.map((chapter, chapterIndex) => ({
          id: chapter._id,

          // Position is generated from the current
          // array order, not from the old DB position.

          position: chapterIndex + 1,
        })),

        lessons: chapters.flatMap((chapter) =>
          chapter.lessons.map((lesson, lessonIndex) => ({
            id: lesson._id,
            position: lessonIndex + 1,
          })),
        ),
      };

      console.log("COURSE STRUCTURE PAYLOAD:");
      console.log(payload);
      //// API Request
      const res = await adminEditCourse_structure(payload);
      if (res) {
        toast.success("Structure changed");
      } else {
        toast.error("Failed to save changes");
      }

      setIsDirty(false);
    } catch (error) {
      console.error("Failed to save course structure:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border">
            <CardTitle>Chapters</CardTitle>
            <CreateChapterModal courseId={courseId} />
          </CardHeader>

          <CardContent className="space-y-8">
            {chapters.map((chapter, index) => (
              <SortableCourse
                key={chapter._id}
                chapter={chapter}
                index={index}
                courseId={courseId}
                toggleChapter={toggleChapter}
              />
            ))}

            {chapters.length === 0 && (
              <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                No chapters found.
              </div>
            )}
          </CardContent>
        </Card>
      </DragDropProvider>

      {/* save changes */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isDirty ? "You have unsaved changes." : "All changes are saved."}
        </p>

        <Button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default CourseStructureForm;

// sortable chapter
function SortableCourse({
  chapter,
  index,
  courseId,
  toggleChapter,
}: SortableCourseProps) {
  const { ref, isDragging } = useSortable({
    id: chapter._id,
    index,

    // All chapters belong to the same sortable group
    group: "chapters",

    // Chapter can only interact with Chapter.
    type: "chapter",
    accept: "chapter",
  });

  return (
    <Card ref={ref} className={isDragging ? "opacity-50" : undefined}>
      <Collapsible
        open={chapter.isOpen}
        onOpenChange={() => toggleChapter(chapter._id)}
      >
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-2">
            {/* Drag handle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="cursor-grab opacity-60 hover:opacity-100 active:cursor-grabbing"
            >
              <GripVertical className="size-4" />
            </Button>

            {/* Collapse */}
            <CollapsibleTrigger
              className="flex items-center justify-center"
              render={<button type="button" />}
            >
              {chapter.isOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </CollapsibleTrigger>

            <p className="cursor-pointer pl-2 hover:text-primary">
              {chapter.title}
            </p>
          </div>

          <DeleteChapterModal chapterId={chapter._id} courseId={courseId} />
        </div>

        <CollapsibleContent>
          <div className="p-1">
            {chapter.lessons.map((lesson, index) => (
              <SortableLesson
                key={lesson._id}
                lesson={lesson}
                index={index}
                courseId={courseId}
                chapterId={chapter._id}
              />
            ))}

            <div className="p-2">
              <CreateLessonModal chapterId={chapter._id} />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

// sortable lesson
function SortableLesson({
  lesson,
  index,
  courseId,
  chapterId,
}: SortableLessonProps) {
  const { ref, isDragging } = useSortable({
    id: lesson._id,
    index,

    // Every chapter gets its own lesson group.
    group: `chapter:${chapterId}`,

    type: "lesson",
    accept: "lesson",
  });

  return (
    <div
      ref={ref}
      className={[
        "z-50 flex items-center justify-between rounded-sm p-2",
        "hover:bg-accent",
        isDragging ? "opacity-50" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        {/* Drag handle */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </Button>

        <FileText className="size-4" />

        <Link
          href={`/admin/courses/${courseId}/${chapterId}/${lesson._id}`}
          className="hover:text-primary"
        >
          {lesson.title}
        </Link>
      </div>
      <DeleteLessonModal chapterId={chapterId} lessonId={lesson._id} />
    </div>
  );
}
