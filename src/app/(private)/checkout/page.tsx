"use client";

import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbCurrencyTaka } from "react-icons/tb";
import {
  cartSetLocalStorage,
  clearCart,
  deleteCartItem,
  setServiceDate,
  setServiceTime,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { format } from "date-fns";
import axios from "axios";
import { serverURL } from "@/utils/serverUrl";
import { getLocalStorage } from "@/utils/local-storage";

const CheckoutPage = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [error, setError] = React.useState([]);
  const pDate = format(new Date(), "yyyy-MM-dd");

  function checkdate(seldate: any) {
    let pArray = pDate.split("-");
    let sArray = seldate.split("-");

    if (parseInt(pArray[0]) > parseInt(sArray[0])) {
      return false;
    }
    if (parseInt(pArray[0]) < parseInt(sArray[0])) {
      return true;
    }

    if (parseInt(pArray[1]) > parseInt(sArray[1])) {
      return false;
    }
    if (parseInt(pArray[1]) < parseInt(sArray[1])) {
      return true;
    }
    if (parseInt(pArray[2]) >= parseInt(sArray[2])) {
      return false;
    }
    return true;
  }
  function formSubmit() {
    const newError: any = [];
    cart?.items?.forEach((item: any) => {
      let e = {
        date: item?.date ? false : true,
        time: item?.time ? false : true,
      };
      newError.push(e);
    });

    let found = newError?.find((e: any) => {
      return e.date || e.time;
    });
    setError([...newError]);
    const subData = [];
    cart?.items?.forEach((item: any) => {
      subData.push({
        serviceId: item?.id,
        date: item?.date,
        time: item?.time,
        price: item?.price,
        status: "pending",
      });
    });
    if (found) return;
    axios
      .post(serverURL + "/booking", subData, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      .then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          dispatch(clearCart());
          dispatch(cartSetLocalStorage());
        }
      })
      .catch((err) => {
        toast.success(err?.data?.message);
        toast.error("Something went wrong");
      });
  }

  return (
    <div className="min-h-[80vh] pb-10">
      {cart?.items === null ? (
        <div className="min-h-[80vh] flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <>
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
                      <input
                        type="date"
                        value={item?.date}
                        onChange={(e) => {
                          if (!checkdate(e.target.value)) {
                            toast.error(
                              "Invalid date! You Can't select Previous date or Present date"
                            );
                            dispatch(
                              setServiceDate({
                                id: item?.id,
                                date: "",
                              })
                            );
                            dispatch(cartSetLocalStorage());
                            return;
                          }
                          dispatch(
                            setServiceDate({
                              id: item?.id,
                              date: e.target.value,
                            })
                          );
                          dispatch(cartSetLocalStorage());
                        }}
                      />
                      <p className="text-red-700 text-xs">
                        {error?.[index]?.date && "Invalid date"}
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <input
                        type="time"
                        value={item?.time}
                        onChange={(e) => {
                          dispatch(
                            setServiceTime({
                              id: item?.id,
                              time: e.target.value,
                            })
                          );
                          dispatch(cartSetLocalStorage());
                        }}
                      />
                      <p className="text-red-700 text-xs">
                        {error?.[index]?.time && "Invalid time"}
                      </p>
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
              {cart?.total > -1 && (
                <Table.Head>
                  <Table.HeadCell
                    colSpan={5}
                    className="text-right text-lg font-bold text-black"
                  >
                    Total:
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex items-center gap-1 text-base text-slate-800">
                      <TbCurrencyTaka className="text-xl font-semibold" />{" "}
                      {cart?.total}
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div
                      className="rounded-lg bg-cyan-700 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 cursor-pointer my-2"
                      onClick={() => {
                        formSubmit();
                      }}
                    >
                      <p>Confirm Order</p>
                    </div>
                  </Table.HeadCell>
                </Table.Head>
              )}
            </Table>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
