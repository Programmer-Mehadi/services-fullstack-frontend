import FooterSection from "@/components/ui/FooterSection";
import React from "react";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <FooterSection />
    </div>
  );
};

export default PrivateLayout;
