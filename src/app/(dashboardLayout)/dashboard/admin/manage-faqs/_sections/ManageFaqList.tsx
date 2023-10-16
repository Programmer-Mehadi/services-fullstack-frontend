"use client";

import DropDown from "@/components/Forms/Fields/DropDown";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Dropdown, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ManageFaqList = ({
  dataList: data,
  reFetch,
  setReFetch,
}: {
  dataList: any;
  reFetch: any;
  setReFetch: any;
}) => {
  const router = useRouter();

  async function statusChange(id: any, status: any) {
    try {
      const result = await axios.put(
        serverURL + `/faq/status-change/${id}`,
        {
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        }
      );

      if (result.data?.data) {
        toast.success(result.data?.message);
      } else {
        toast.error(result.data?.message);
      }
      setReFetch(!reFetch);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  async function deleteFaq(id: any) {
    try {
      const result = await axios.delete(serverURL + `/faq/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      });
      if (result.data?.data) {
        toast.success(result.data?.message);
      } else {
        toast.error(result.data?.message);
      }
      setReFetch(!reFetch);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      {data === null ? (
        <div className="flex justify-center py-8">
          <SpinLoader />
        </div>
      ) : (
        <section className="overflow-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-cyan-800 text-white"></Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Question
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Answer
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Author name
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                <span>Actions</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border">
              {data.map((faq: any, index: number) => {
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
                      {faq?.ques}
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      {faq?.ans}
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      {faq?.user?.name}
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      <div>
                        <Dropdown
                          label={
                            faq?.status.charAt(0).toUpperCase() +
                            faq?.status.slice(1)
                          }
                          size="sm"
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "1px solid black",
                          }}
                        >
                          <Dropdown.Item
                            onClick={() => {
                              statusChange(faq?.id, "active");
                            }}
                          >
                            Active
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              statusChange(faq?.id, "inactive");
                            }}
                          >
                            InActive
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      <div className="flex gap-2 text-lg">
                        <AiFillEdit
                          onClick={() => {
                            router.push(
                              `/dashboard/admin/manage-faqs/edit/${faq?.id}`
                            );
                          }}
                          className="cursor-pointer text-blue-600"
                        />
                        <AiFillDelete
                          onClick={() => {
                            deleteFaq(faq?.id);
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
        </section>
      )}
    </>
  );
};

export default ManageFaqList;
