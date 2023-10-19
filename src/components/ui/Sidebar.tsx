"use client";

import {SidebarItems} from "@/constants/SidebarItems";
import {getUserInfo} from "@/services/auth.services";

const SideBar = () => {
  const {role}: any = getUserInfo() || "";
  // const role: string = "super_admin";

  return <SidebarItems role={role} />;
};

export default SideBar;
