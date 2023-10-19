"use client";
// @ts-ignore
import {getUserInfo, isLoggedIn} from "@/services/auth.services";
import {useRouter} from "next/navigation";
import {Fragment, useEffect} from "react";
const SuperAdminLayout = ({children}: {children: React.ReactNode}) => {
  const isLogIn = isLoggedIn();
  const userInfo: any = getUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (!isLogIn) {
      router.push("/login");
      return;
    } else if (userInfo.role !== "admin") {
      router.push("/dashboard");
      return;
    }
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default SuperAdminLayout;
