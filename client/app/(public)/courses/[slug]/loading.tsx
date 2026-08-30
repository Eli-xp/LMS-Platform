import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Loading = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left Section */}
      <div className="order-1 lg:col-span-2">
        {/* Thumbnail */}
        <Skeleton className="aspect-video w-full rounded-xl" />

        <div className="mt-8 space-y-6">
          {/* Title + description */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-11 w-28 rounded-md" />
            <Skeleton className="h-11 w-32 rounded-md" />
            <Skeleton className="h-11 w-28 rounded-md" />
          </div>

          <Separator className="my-8" />

          {/* Description */}
          <div className="space-y-6">
            <Skeleton className="h-9 w-56" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>

          {/* Course Content */}
          <div className="mt-12 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-52" />
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Chapters */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((chapter) => (
                <Card key={chapter} className="overflow-hidden border-2 p-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Chapter number */}
                        <Skeleton className="size-10 rounded-full" />

                        {/* Chapter title */}
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-20 rounded-md" />
                        <Skeleton className="size-4 rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              {/* Price */}
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>

              {/* Course info */}
              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                <Skeleton className="h-5 w-36" />

                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      {/* Icon */}
                      <Skeleton className="size-8 rounded-full" />

                      {/* Text */}
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="mb-6 space-y-3">
                <Skeleton className="h-5 w-36" />

                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Skeleton className="size-6 rounded-full" />
                      <Skeleton className="h-4 w-44" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <Skeleton className="h-10 w-full rounded-md" />

              <Skeleton className="mx-auto mt-3 h-3 w-40" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
