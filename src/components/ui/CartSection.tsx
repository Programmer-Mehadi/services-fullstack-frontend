"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import {
  cartGetLocalStorage,
  cartSetLocalStorage,
  deleteCartItem,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import Link from "next/link";

const CartSection = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: any) => state.cart);
  useEffect(() => {
    dispatch(cartGetLocalStorage());
  }, []);
  return (
    <div
      className="fixed top-0 right-0 z-50 w-full min-h-screen bg-gray-200 bg-opacity-40 flex justify-end hidden"
      id="cart-drawer-navigation"
      onClick={() => {
        document
          ?.getElementById("cart-drawer-navigation")
          ?.classList.toggle("hidden");
      }}
    >
      <div
        className="w-full max-w-[400px] h-full p-4 min-h-screen  bg-white dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Cart
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            onClick={() => {
              document
                ?.getElementById("cart-drawer-navigation")
                ?.classList.toggle("hidden");
            }}
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto pt-10">
          <ul className="space-y-2 font-medium">
            {cart?.items?.map((item: any, index: number) => (
              <li key={index}>
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={item?.image} className="w-14 h-14" alt="" />
                  {/* content */}
                  <div className="grid gap-2 flex-1">
                    <span className="ml-3">{item?.title}</span>
                    <span className="ml-3 text-sm text-slate-700 flex items-center">
                      <TbCurrencyTaka className="text-base" /> {item?.price}
                    </span>
                  </div>
                  {/* actions */}
                  <div>
                    <AiFillDelete
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        dispatch(
                          deleteCartItem({
                            id: item?.id,
                            price: item?.price,
                          })
                        );
                        dispatch(cartSetLocalStorage());
                        toast.success("Deleted successfully");
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
            {cart?.items?.length === 0 && (
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                No items in cart
              </p>
            )}
          </ul>
        </div>
        {cart.total > -1 && (
          <>
            <div>
              <hr />
              <div className="flex justify-between items-center py-2">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  Total:
                </span>
                <span className="text-xl flex gap-1 font-semibold text-gray-900 dark:text-white">
                  <TbCurrencyTaka /> {cart?.total}
                </span>
              </div>
            </div>
            <div
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 cursor-pointer my-10"
              onClick={() => {}}
            >
              <Link href="/checkout">Go To Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSection;
