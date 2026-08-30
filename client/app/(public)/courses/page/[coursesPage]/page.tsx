import { Suspense } from "react";
import { PublicCoursesPageSkeleton } from "./_components/PublicCoursesPageSkeleton";
import { PublicCoursesList } from "./_components/PublicCoursesList";

const PublicCoursesPage = async ({ params }) => {
  const { coursesPage } = await params;
  // convert string to number
  const currentPageNum = Number(coursesPage);

  console.log(coursesPage);

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-10 mt-5">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals.
        </p>
      </div>
      <Suspense fallback={<PublicCoursesPageSkeleton />}>
        <PublicCoursesList currentPageNum={currentPageNum} />
      </Suspense>
    </div>
  );
};

export default PublicCoursesPage;
