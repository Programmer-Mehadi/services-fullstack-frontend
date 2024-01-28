import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Not Found - EleganceInteriors",
}
const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl text-center">404!!! Page Not Found</h1>
    </div>
  )
}

export default NotFoundPage
