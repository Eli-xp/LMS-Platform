import { redirect } from "next/navigation";

const page = () => {
  redirect("/admin/courses/page/1");
};

export default page;
