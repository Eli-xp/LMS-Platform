import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PublicCoursesPageSkeleton = () => {
  return (
    <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {Array.from({ length: 10 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

const AdminCourseCardSkeleton = () => {
  return (
    <Card className="group relative py-0 gap-0 overflow-hidden">
      {/* dropdown */}
      <div className="absolute top-2 right-2 z-50">
        <Skeleton className="size-9 rounded-md" />
      </div>

      {/* thumbnail */}
      <Skeleton className="w-full rounded-t-lg aspect-video object-cover" />

      <CardContent className="p-4">
        {/* title */}
        <Skeleton className="h-6 w-[80%] mb-2 rounded" />

        {/* description */}
        <div className="mt-2 space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-[75%] rounded-md" />
        </div>

        {/* Metadata */}
        <div className="mt-4 flex items-center gap-x-5">
          {/* Duration */}
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8 rounded-md" />
          </div>
          {/* Level */}
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          {/* Edit button */}
          <Skeleton className="mt-4 h-9 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
