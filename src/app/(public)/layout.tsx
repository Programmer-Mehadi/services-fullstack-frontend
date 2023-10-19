import FooterSection from "@/components/ui/FooterSection";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <FooterSection />
    </div>
  );
};

export default PublicLayout;
