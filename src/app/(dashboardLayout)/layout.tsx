"use client";

import Sidebar from "@/components/ui/Sidebar";
import {getUserInfo, isLoggedIn} from "@/services/auth.services";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  const isLogIn = isLoggedIn();
  const router = useRouter();
  useEffect(() => {
    if (!isLogIn) {
      router.push("/login");
    }
    const userInfo: any = getUserInfo();
    if (!userInfo?.role) {
      router.push("/login");
    }
  }, []);
  return (
    <section
      className="flex max-w-[100vw] w-full"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <Sidebar />
      <section className="flex-1 p-5 max-w-[calc(100vw-250px)]">
        {children}
      </section>
    </section>
  );
};

export default DashboardLayout;
