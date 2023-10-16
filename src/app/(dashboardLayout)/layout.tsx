"use client";

import Sidebar from "@/components/ui/Sidebar";
import React, { useState } from "react";
import HeaderSection from "../../components/ui/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

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
