import { decodedToken } from "@/utils/jwt";
import { getLocalStorage, setLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setLocalStorage("service-website-token", accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getLocalStorage("service-website-token");
  if (authToken) {
    const decodedata = decodedToken(authToken);
    return decodedata;
  } else {
    return {};
  }
};

export const isLoggedIn = () => {
  const authToken = getLocalStorage("service-website-token");
  return !!authToken;
};

export const logout = (key: string) => {
  return localStorage.removeItem(key);
};
