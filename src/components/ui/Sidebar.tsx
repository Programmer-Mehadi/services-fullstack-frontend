"use client";

import { useState } from "react";

import { SidebarItems } from "@/constants/SidebarItems";
import { getUserInfo } from "@/services/auth.services";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const {role} = getUserInfo();
  const role: string = "super_admin";

  return <SidebarItems role={role} />;
};

export default SideBar;
