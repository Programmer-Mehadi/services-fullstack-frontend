"use client";

import FooterSection from "@/components/ui/FooterSection";
import {getUserInfo} from "@/services/auth.services";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const PrivateLayout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const userInfo: any = getUserInfo();

  useEffect(() => {
    if (!userInfo?.role) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      {children}
      <FooterSection />
    </div>
  );
};

export default PrivateLayout;
