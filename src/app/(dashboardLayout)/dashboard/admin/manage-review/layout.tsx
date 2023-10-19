import type {Metadata} from "next";
import {Fragment} from "react";
// metadata set
export const metadata: Metadata = {
  title: "Manage Review",
  description: "Manage Review Page",
};

const SuperAdminLayout = ({children}: {children: React.ReactNode}) => {
  return <Fragment>{children}</Fragment>;
};

export default SuperAdminLayout;
