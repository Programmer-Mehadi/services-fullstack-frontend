"use client";

import Sidebar from "@/components/ui/Sidebar";
import React, { useState } from "react";
import HeaderSection from "../../components/ui/Header";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isLogIn = isLoggedIn();
  const router = useRouter();
  if (!isLogIn) {
    router.push("/login");
  }
  const userInfo = getUserInfo();
  if (!userInfo?.role) {
    router.push("/login");
  }
  return (
    <section
      className="flex"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <Sidebar />
      <section className="flex-1 p-5">{children}</section>
    </section>
  );
};

export default DashboardLayout;
