import React from "react"

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Conatct us - EleganceInteriors",
}
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default PublicLayout
