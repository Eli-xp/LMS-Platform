import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminGetCourse } from "@/services/admin/course/GetCourse.server-admin";
import CourseEditForm from "./_components/CourseEdit.form";
import CourseStructure from "./_components/CourseStructure";

const courseEditPage = async ({ params }) => {
  const { courseId } = await params;
  let courseData;

  if (courseId) {
    // Get course information by id
    try {
      console.log(courseId);
      const { data } = await adminGetCourse(courseId);
      courseData = data;
      console.log(courseData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit Course:{" "}
        <span className="text-primary underline">{courseData?.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseEditForm course={courseData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can update your course structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default courseEditPage;
