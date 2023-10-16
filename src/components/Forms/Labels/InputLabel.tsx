import React from "react";

const InputLabel = ({ title, style }: { title?: string; style?: any }) => {
  return (
    <span
      style={{
        color: "rgba(0, 0, 0, 0.88)",
        fontWeight: 400,
        fontSize: "18px",
        ...style,
      }}
    >
      {title}
    </span>
  );
};

export default InputLabel;
