"use client";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import {getUserInfo} from "@/services/auth.services";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
const DashboardHomePage = () => {
  const router = useRouter();
  const userInfo: any = getUserInfo();
  useEffect(() => {
    if (userInfo?.role === "user") {
      router.push("/dashboard/user/profile");
    } else if (userInfo?.role === "admin") {
      router.push("/dashboard/admin/profile");
    } else if (userInfo?.role === "super_admin") {
      router.push("/dashboard/super-admin/profile");
    }
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <SpinLoader />
    </div>
  );
};

export default DashboardHomePage;
