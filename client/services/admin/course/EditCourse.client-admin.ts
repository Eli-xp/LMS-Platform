const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminEditCourse = async (changedValuesforserver, course_id:string) => {
  // only admin

  console.log(changedValuesforserver);
  console.log(typeof course_id);
  const id = course_id;

  // Request Validation
  const res = await fetch(`${API_URL}/admin/courses/edit/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(changedValuesforserver),
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    throw new Error(`Failed to edit course as admin:${res.status}`);
  }

  const data = await res.json();
  console.log(data);

  return data;
};

