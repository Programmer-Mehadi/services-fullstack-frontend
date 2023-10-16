export const setLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") return "";
  return localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
