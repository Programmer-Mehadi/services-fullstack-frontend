import { Button } from "flowbite-react";
import React from "react";

const SubmitButton = ({
  title,
  style,
  disabled = false,
  className = "",
}: {
  title?: string;
  style?: any;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <Button
      color="dark"
      style={{
        borderRadius: "4px",
        fontSize: "18px",
        height: "40px",
        ...style,
      }}
      type="submit"
      disabled={disabled}
      className={"bg-blue-700  " + className}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
