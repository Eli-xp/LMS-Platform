export const adminCourseFileVerification = async ({ link, file }) => {
  // only admin

  console.log(file);
  console.log(link);
  const fileds = link.fields;
  const formData = new FormData();
  Object.entries(fileds).forEach(([key, value]) => {
    formData.append(key, value as string);
    console.log(formData);
  });
  formData.append("file", file);

  console.log(formData);

  // Request Validation
  const res = await fetch(`${link.url}`, {
    method: "POST",
    body: formData,
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to post course as admin:${res.status}`);
  }

  return res;
};
