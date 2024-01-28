import { Button } from "flowbite-react"
import React from "react"

const SubmitButton = ({
  title,
  style,
  disabled = false,
  className = "",
  onClickFnc = () => {},
}: {
  title?: string
  style?: any
  disabled?: boolean
  className?: string
  onClickFnc?: any
}) => {
  return (
    <div
      onClick={onClickFnc}
      color="dark"
      style={{
        borderRadius: "4px",
        fontSize: "14px",
        height: "40px",
        ...style,
      }}
      className={
        "bg-blue-700 flex justify-center items-center text-white px-8 cursor-pointer " +
        className
      }
    >
      {title}
    </div>
  )
}

export default SubmitButton
