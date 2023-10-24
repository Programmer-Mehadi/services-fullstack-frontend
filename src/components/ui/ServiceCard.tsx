"use client";
import {cartSetLocalStorage, setCart} from "@/redux/slices/cartSlice";
import {Badge, Card} from "flowbite-react";
import Link from "next/link";
import toast from "react-hot-toast";
import {BsEyeFill, BsFillCartFill} from "react-icons/bs";
import {TbCurrencyTaka} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
const ServiceCard = (data: any) => {
  const dispatch = useDispatch();
  const {cart} = useSelector((state: any) => state.cart);
  const {data: cardData} = data;
  const {title, price, image, location, category, availability} = cardData;
  return (
    <Card
      className="h-full min-w-[350px]  p-0 m-0 service_card relative top-0 left-0"
      style={{
        padding: "0",
        margin: "0",
      }}
    >
      <img src={image} className="h-[200px] w-full rounded-t-lg" alt="" />
      <div className="px-4">
        <h5 className="text-xl  tracking-tight text-gray-900 dark:text-white">
          <p>
            {" "}
            <span className="font-semibold">Title: </span>{" "}
            {title ? title : "No Title Found"}
          </p>
        </h5>
        <Badge
          color="success"
          className="w-fit my-1 absolute top-3 right-3 text-lg"
        >
          {category?.title}
        </Badge>
      </div>
      <div className="mb-1 flex items-center gap-2  text-base px-4">
        <span className="font-semibold">Location:</span>
        <span className=" text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {location}
        </span>
      </div>
      {availability && (
        <div className="mb-1 flex items-center gap-2  text-base px-4">
          <span className="font-semibold">Availability:</span>
          <span className=" text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            {availability}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between px-4">
        <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <TbCurrencyTaka /> {price}
        </span>
        <div className="flex gap-2 items-center">
          <div
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 cursor-pointer"
            onClick={() => {
              let found = cart?.items?.find(
                (item: any) => item.id == cardData?.id
              );

              if (!found) {
                dispatch(
                  setCart({
                    id: cardData.id,
                    title: cardData.title,
                    price: cardData.price,
                    image: cardData.image,
                  })
                );
                toast.success("Added to cart");
                dispatch(cartSetLocalStorage());
              } else {
                toast.error("Already added to cart");
              }
            }}
          >
            <BsFillCartFill />
          </div>
          <div className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 cursor-pointer">
            <Link href={`/services/view/${cardData?.id}`}>
              <BsEyeFill />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
