import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

// sapmle data
const features: featureProps[] = [
  {
    title: "Learning A1 English",
    description:
      "Great Experiences for noob eng learning students that with experts",
    icon: "📚",
  },
  {
    title: "Learning A2 English",
    description:
      "Nice job bro now you are not blind and deaf for TS! for noob eng learning students that with experts",
    icon: "🎒",
  },
  {
    title: "Learning A1 German",
    description:
      "this is the first game playing learning with CS-GO German servers Good luck!",
    icon: "🎮",
  },
  {
    title: "Learning A1 Russian",
    description:
      "SUKA Blyat, game playing learning with Dota2 Russian servers Good luck!",
    icon: "🎱",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col text-center items-center justify-center space-y-8">
          <Badge variant={"outline"} className="">
            The Future Of Online Education
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Discover a nwe way to learn with our modern, interactive learning
            mangement system. Access gigh-quality courses anytime, anywhere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 my-8">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, id) => (
          <Card key={id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
