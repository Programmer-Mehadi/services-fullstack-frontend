import type { Metadata } from "next"
import { Fragment } from "react"
// metadata set
export const metadata: Metadata = {
  title: "Manage Service - EleganceInteriors",
  description: "Manage Service Page",
}

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

export default SuperAdminLayout
