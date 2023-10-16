"use client";

import React, { useEffect } from "react";
import HeaderSection from "../../components/ui/Header";
import { useRouter } from "next/navigation";
import { initFlowbite } from "flowbite";
const App = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <section
      className="layout"
      style={{
        minHeight: "100vh",
      }}
    >
      <section style={{ padding: "0 0px", minHeight: "60vh" }}>
        {children}
      </section>
    </section>
  );
};

export default App;
