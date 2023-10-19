"use client";

import FooterSection from "@/components/ui/FooterSection";
import { setUser } from "@/redux/slices/userSlice";
import { getUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userInfo = getUserInfo();

  if (!userInfo?.role) {
    router.push("/login");
  }

  return (
    <div>
      {children}
      <FooterSection />
    </div>
  );
};

export default PrivateLayout;
