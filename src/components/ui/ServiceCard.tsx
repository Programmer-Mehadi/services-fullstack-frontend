"use client";
import { Badge, Card } from "flowbite-react";
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
const ServiceCard = (data: any) => {
  const { data: cardData } = data;
  const { title, price, image, location, category } = cardData;
  return (
    <Card
      className="h-full p-0 m-0 service_card"
      style={{
        padding: "0",
        margin: "0",
      }}
    >
      <img src={image} className="h-[200px] w-full rounded-t-lg" alt="" />
      <div className="px-4">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <p>{title ? title : "No Title Found"}</p>
        </h5>
        <Badge
          color="indigo"
          className="w-fit my-2 absolute top-3 right-3 text-lg"
        >
          {category?.title}
        </Badge>
      </div>
      <div className="mb-5 flex items-center px-4">
        <span className=" px-4 mr-2 rounded bg-cyan-100 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {location}
        </span>
      </div>
      <div className="flex items-center justify-between px-4">
        <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <TbCurrencyTaka /> {price}
        </span>
        <a
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          href="#"
        >
          <p>Add to cart</p>
        </a>
      </div>
    </Card>
  );
};

export default ServiceCard;
