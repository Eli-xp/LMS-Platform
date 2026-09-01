import { PublicGetCourses_API } from "@/services/public/course/GetCourses.server";
import PublicCourseCard from "../../components/course/PublicCourseCard";
import EmptyState from "@/components/stateHandling/EmptyState";
import { PublicGetCourses_EachCourseType } from "@/schemas/public/course.schema";

const UserDashboardPage = async () => {
  const [suggestionCourses, userCourses] = await Promise.all([
    PublicGetCourses_API({ currentPageNum: 1, limit: 2 }),
    [],
  ]);

  console.log(suggestionCourses);
  console.log(userCourses);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {/* Empty State  */}
      {userCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You have not purchased any courses yet."
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <p>The courses you are enrolled in</p>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses can purchase
          </p>
        </div>

        {/* Courses Suggestion - list of not purchased courses */}

        {suggestionCourses.length === 0 ? (
          <EmptyState
            title="No courses purchased"
            description="You have not purchased any courses yet."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestionCourses?.courses?.map(
              (course: PublicGetCourses_EachCourseType) => (
                <PublicCourseCard key={course._id} {...course} />
              ),
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default UserDashboardPage;
