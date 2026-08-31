import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicGetCourses_EachCourseType } from "@/schemas/public/course.schema";
import { ArrowRight, School, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PublicCourseCard = (course: PublicGetCourses_EachCourseType) => {
  console.log(course);
  return (
    <Card className="group relative py-0 gap-0">
      {/* badge */}
      <Badge className="absolute top-2 right-2 z-50">{course.level}</Badge>

      <Image
        src={course?.thumbnail.viewUrl || "/next.svg"}
        alt={course?.title || "course thumbnail"}
        width={600}
        height={400}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
      />
      <CardContent className="p-4">
        <Link
          href={`/courses/${course.slug}`}
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
            <p className="text-sm text-muted-foreground">{course.category}</p>
          </div>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className={buttonVariants({
            className: "flex items-center justify-center w-full mt-4",
          })}
        >
          <p>Learn More</p>
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default PublicCourseCard;
