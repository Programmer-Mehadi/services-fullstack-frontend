export const serverURL =
  (process.env.NEXT_PUBLIC_API_BASE_URL as string) ||
  "http://localhost:5000/api/v1";
