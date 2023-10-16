export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLICAPI_BASE_URL || "http://localhost:3030";
};
