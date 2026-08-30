import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { PublicGetSingleCourseType } from "@/schemas/public/course.schema";
import { PublicGetSingleCourse_API } from "@/services/public/course/GetCourse.server";
import {
  BookOpen,
  ChartBar,
  ChartColumnStacked,
  CheckIcon,
  ChevronDown,
  Clock4,
  ClockIcon,
  ListSortDescending,
  PlayIcon,
} from "lucide-react";
import Image from "next/image";

const SlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // Get url slug
  const { slug } = await params;
  console.log(slug);

  // Get course information
  const course: PublicGetSingleCourseType =
    await PublicGetSingleCourse_API(slug);

  console.log(course);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      {/* //// left sectrion - course info */}
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={course.thumbnail}
            alt="course thumbnail"
            className="object-cover"
            fill
          />
          {/* shadow transparent for image */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {course.smallDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="flex justify-center items-center gap-1 p-3">
              <ChartBar className="size-4" />
              <span>{course.level}</span>
            </Badge>
            <Badge className="flex justify-center items-center gap-1 p-3">
              <ListSortDescending className="size-4" />
              <span>{course.category}</span>
            </Badge>
            <Badge className="flex justify-center items-center gap-1 p-3">
              <Clock4 className="size-4" />
              <span>{course.category}</span>
            </Badge>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Description
            </h2>
            <RenderDescription json={course.description} />
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight">
                Course Content
              </h2>
              <div>
                {course.chapters?.length} Chapters |
                {course.chapters.reduce(
                  (total, chapter) => total + chapter.lessons.length,
                  0,
                ) || 0}
                Lessons
              </div>
            </div>

            <div className="space-y-4">
              {/* chapters */}
              {course.chapters?.map((chapter, index) => (
                <Collapsible key={chapter._id} defaultOpen={index === 0}>
                  <Card
                    className="p-0 overflow-hidden border-2
                 transition-all duration-200 hover:shadow-md gap-0"
                  >
                    <CollapsibleTrigger>
                      <div>
                        <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                  {index + 1}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-left">
                                  {chapter.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 text-left"></p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-xs">
                                {chapter.lessons?.length} lesson
                                {chapter.lessons?.length !== 1 && "s"}
                              </Badge>
                              <ChevronDown className="size-4" />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t bg-muted/20 ">
                        {/* lesson */}
                        <div className="p-6 pt-4 space-y-3">
                          {chapter.lessons?.map((lesson, lessonindex) => (
                            <div
                              key={lesson._id}
                              className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/50">
                                <PlayIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Lesson {lessonindex + 1}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* //// right sectrion - enrollment card */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Price</span>
                <span className="text-2xl font-bold text-primary">
                  ${course.price}.00
                </span>
              </div>

              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                <h4 className="font-medium">What you will get:</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ClockIcon className="size-4" />
                    </div>
                    <div>
                      <p className="text-left text-sm font-medium">Duration</p>
                      <p className="text-left text-sm text-muted-foreground">
                        {course.duration} hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ChartBar className="size-4" />
                    </div>
                    <div>
                      <p className="text-left text-sm font-medium">
                        Difficulity Level
                      </p>
                      <p className="text-left text-sm text-muted-foreground">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ChartColumnStacked className="size-4" />
                    </div>
                    <div>
                      <p className="text-left text-sm font-medium">Category</p>
                      <p className="text-left text-sm text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BookOpen className="size-4" />
                    </div>
                    <div>
                      <p className="text-left text-sm font-medium">
                        Total Lessons
                      </p>
                      <p className="text-left text-sm text-muted-foreground">
                        {course.chapters?.reduce(
                          (total, chapter) => total + chapter.lessons.length,
                          0,
                        ) || 0}{" "}
                        Lessons
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4>This course includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Access on mobile and desktop</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Certificate of Completioin</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full">Enroll Now!</Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                30-day monet-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SlugPage;
