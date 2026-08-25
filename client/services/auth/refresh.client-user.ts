const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const refreshRecovery = async () => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return res.ok;
};
