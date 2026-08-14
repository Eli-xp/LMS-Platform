import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminGetCourses } from "@/schemas/course.schema";
import {
  ArrowRight,
  EyeIcon,
  MoreVerticalIcon,
  PencilIcon,
  School,
  TimerIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import z from "zod";

const AdminCourseCard = (course: z.infer<typeof adminGetCourses>) => {
  console.log(course);
  return (
    <Card className="group relative py-0 gap-0">
      {/* absolute dropdown */}
      <div className="absolute top-2 right-2 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant={"secondary"}
                size={"icon"}
                className="bg-secondary/30 cursor-pointer"
              />
            }
          >
            <MoreVerticalIcon size={4} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              render={
                <Link
                  href={`/admin/courses/${course.id}/edit`}
                  className="cursor-pointer"
                />
              }
            >
              <PencilIcon size={16} className="opacity-60" aria-hidden="true" />
              <span className="opacity-90">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              render={
                <Link
                  href={`/courses/${course.id}/edit`}
                  className="cursor-pointer"
                />
              }
            >
              <EyeIcon size={16} className="opacity-60" aria-hidden="true" />
              <span className="opacity-90">Pre-view</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={buttonVariants({
                className:
                  "flex w-full justify-start items-center cursor-pointer hover:bg-red-500/20",
              })}
              render={<Link href={`/admin/courses/${course.id}/delete`} />}
            >
              <Trash2 size={16} className="opacity-60" aria-hidden="true" />
              <span className="opacity-90">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        src={course?.fileKey || "/next.svg"}
        alt={course?.title || "course thumbnail"}
        width={600}
        height={400}
        className="w-full rounded-t-lg aspect-video h-full object-cover "
      />
      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${course.id}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>
        <p className="line-clamp-2 mt-2 text-sm text-muted-foreground leading-tight">
          {course.smallDescription}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center justify-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.duration}h</p>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.level}</p>
          </div>
        </div>

        <Link
          href={`/admin/courses/${course.id}/edit`}
          className={buttonVariants({
            className: "flex items-center justify-center w-full mt-4",
          })}
        >
          <p>Edit Course</p>
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminCourseCard;
