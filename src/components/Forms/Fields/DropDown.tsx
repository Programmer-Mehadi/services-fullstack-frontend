"use client";

import { Dropdown } from "flowbite-react";

const DropDown = ({
  label = "Select any one",
  size = "sm",
  className = "",
  itemList = [],
  name,
  style,
  isRequired,
  register,
  errors,
  watch,
  setValue,
}: {
  label?: string;
  size?: string;
  className?: string;
  itemList?: {
    label: string;
    value: string;
  }[];
  name?: string;
  style?: any;
  isRequired?: string;
  register?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
}) => {
  const activeLabel = label;

  itemList.forEach((item) => {
    if (item.value === activeLabel) {
      label = item.label;
    }
  });

  return (
    <Dropdown
      label={label}
      size={size}
      className={className + " customDropdown"}
      name={name}
      style={{
        width: "100%",
        textAlign: "left",
        backgroundColor: "white",
        marginLeft: "0",
        justifyContent: "space-between",
        color: "black",
        border: `${errors[name] ? "1px solid red" : "1px solid black"}`,
        ...style,
      }}
      {...register(name, {
        required: isRequired === "true" ? true : false,
      })}
    >
      {itemList.map((item, index) => (
        <Dropdown.Item
          key={index}
          onClick={() => {
            setValue(name, item.value);
          }}
        >
          {item.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default DropDown;
