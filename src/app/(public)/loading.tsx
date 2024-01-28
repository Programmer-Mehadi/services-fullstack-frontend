import SpinLoader from "@/components/ui/Loader/SpinLoader"

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "EleganceInteriors",
}
const Loading = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <SpinLoader />
    </section>
  )
}

export default Loading
