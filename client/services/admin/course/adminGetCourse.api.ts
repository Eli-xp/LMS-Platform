// expected input:: course id

import { notFound } from "next/navigation";

// expected response:: courseSchema
export const adminGetCourse = async (id: string) => {
  // Only admin API

  const res = await fetch(`API_URL/..`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(id),
  });

  if (!res.ok) {
    throw new Error(`Failed to Get Admin Course: ${res.status}`);
  }

  if (!res) {
    console.log(res);
    return notFound();
  }

  const data = res.json();
  console.log(data);
  return data;
};
