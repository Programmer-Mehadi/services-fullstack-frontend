"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Select, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiHappyBeaming, BiSad } from "react-icons/bi";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";

const ManageBookingHomePage = () => {
  const router = useRouter();

  const [dataList, setDataList] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const statusList = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "approved",
      label: "Approved",
    },
    {
      value: "rejected",
      label: "Rejected",
    },
    {
      value: "missing",
      label: "Missing",
    },
    {
      value: "canceled",
      label: "Canceled",
    },
  ];
  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || "";
    const fetchData = async () => {
      const dataInfo = await axios.get(serverURL + "/booking/get-all", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (dataInfo?.data?.data) {
        setDataList(dataInfo.data.data);
      } else {
        toast.error(dataInfo?.data?.message);
      }
    };
    fetchData();
  }, [reFetch]);

  function statusChange(id, status) {
    axios
      .put(
        `${serverURL}/booking/status-change/${id}`,
        {
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        }
      )
      .then((res) => {
        if (res.data?.data) {
          toast.success(res.data?.message);
          setReFetch(!reFetch);
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => {
        
        toast.error("Something went wrong");
      });
  }
  function deleteData(id) {
    axios
      .delete(`${serverURL}/booking/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      .then((res) => {
        if (res.data?.data) {
          toast.success(res.data?.message);
          setReFetch(!reFetch);
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => {
       
        toast.error("Something went wrong");
      });
  }

  return (
    <section>
      <>
        {dataList === null ? (
          <div className="flex justify-center py-8">
            <SpinLoader />
          </div>
        ) : (
          <section className="overflow-auto">
            {dataList?.length === 0 ? (
              <div className="flex justify-center py-8">
                <h1 className="text-2xl font-bold">No Data Found</h1>
              </div>
            ) : (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="bg-cyan-800 text-white"></Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Service Name
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Price
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Date
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Time
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    <span>Actions</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y border">
                  {dataList.map((faq: any, index: number) => {
                    return (
                      <Table.Row
                        key={index}
                        className={`bg-white dark:border-gray-700 dark:bg-gray-800 border ${
                          index % 2 === 1
                        }
              ? "bg-cyan-400"
              : ""`}
                      >
                        <Table.Cell
                          className={`whitespace-nowrap font-medium text-gray-900 dark:text-white ${
                            index % 2 === 1 ? " bg-cyan-50 " : ""
                          }`}
                        >
                          {index + 1}
                        </Table.Cell>

                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.service?.title ? faq?.service?.title : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          <div className="flex items-center">
                            <TbCurrencyTaka className="text-xl font-semibold" />{" "}
                            {faq?.price ? faq?.price : "---"}
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.date ? faq?.date : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.time ? faq?.time : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          <Select
                            value={faq?.status}
                            onChange={(e) => {
                              statusChange(faq?.id, e.target.value);
                            }}
                          >
                            {statusList.map((status: any, ind: number) => {
                              return (
                                <option key={ind} value={status.value}>
                                  {status.label}
                                </option>
                              );
                            })}
                          </Select>
                        </Table.Cell>

                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          <div className="flex gap-2 text-lg">
                            <AiFillEye
                              onClick={() => {}}
                              className="text-slate-800 cursor-pointer"
                            />
                            <AiFillDelete
                              onClick={() => {
                                deleteData(faq?.id);
                              }}
                              className=" text-red-700 cursor-pointer"
                            />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            )}
          </section>
        )}
      </>
    </section>
  );
};

export default ManageBookingHomePage;
