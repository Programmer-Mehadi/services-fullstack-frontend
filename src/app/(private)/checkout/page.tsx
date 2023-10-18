"use client";

import { Table } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbCurrencyTaka } from "react-icons/tb";
import { cartSetLocalStorage, deleteCartItem } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="min-h-[80vh] pb-10">
      <h2 className="text-2xl font-bold py-10">Checkout page</h2>
      {cart?.items?.length === 0 ? (
        <div className="flex justify-center items-center">
          <h2 className="text-xl font-bold py-10 text-center text-green-700">
            Cart is empty
          </h2>
        </div>
      ) : (
        <Table striped>
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Service name</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {cart?.items?.map((item: any, index: number) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <img src={item?.image} className="w-14 h-14" alt="" />
                </Table.Cell>
                <Table.Cell>{item?.title}</Table.Cell>
                <Table.Cell>
                  <input type="date" />
                </Table.Cell>
                <Table.Cell>
                  <input type="time" />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-1 text-base text-slate-800">
                    <TbCurrencyTaka className="text-xl font-semibold" />{" "}
                    {item?.price}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium text-red-600 hover:underline dark:text-red-500">
                    <p
                      className="cursor-pointer text-xl"
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
                    >
                      Delete
                    </p>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default CheckoutPage;
