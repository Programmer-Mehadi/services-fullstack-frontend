"use client";

import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const isLogIn = isLoggedIn();
  const userInfo = getUserInfo();
  const router = useRouter();

  if (!isLogIn) {
    router.push("/login");
    return;
  } else if (userInfo.role !== "user") {
    router.push("/dashboard");
    return;
  }
  return <Fragment>{children}</Fragment>;
};

export default SuperAdminLayout;
