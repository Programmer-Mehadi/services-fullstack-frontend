import React from "react";

const UploadImage = ({
  name,
  style,
  isRequired,
  register = () => {},
  errors = {},
}: {
  name?: string;
  style?: any;
  isRequired?: string;
  register?: any;
  errors?: any;
}) => {
  return (
    <input
      type="file"
      name={name}
      {...register(name, {
        required: isRequired === "true" ? true : false,
      })}
      style={{
        padding: "7px 11px",
        fontSize: "16px",
        lineHeight: "1.5",
        borderRadius: "8px",
        color: "rgba(0, 0, 0, 0.88)",
        border: "1px solid #d9d9d9",
        ...style,
      }}
    />
  );
};

export default UploadImage;
