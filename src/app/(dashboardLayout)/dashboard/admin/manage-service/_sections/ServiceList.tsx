"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {format, parseISO} from "date-fns";
import {Dropdown, Table} from "flowbite-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {BsEyeFill} from "react-icons/bs";

const ServiceList = ({
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
        serverURL + `/service/status-change/${id}`,
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
      toast.error("Something went wrong");
    }
  }
  async function deleteData(id: any) {
    try {
      const result = await axios.delete(serverURL + `/service/delete/${id}`, {
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
        <section className="overflow-auto pt-8">
          {data?.length === 0 ? (
            <div className="flex justify-center py-8">
              <h1 className="text-2xl font-bold">No Data Found</h1>
            </div>
          ) : (
            <section className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="bg-cyan-800 text-white"></Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Image
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Title
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Price
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Author Name
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Category
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Publication Date
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Location
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-cyan-800 text-white">
                    Availability
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
                          {faq?.image ? (
                            <img
                              src={faq?.image}
                              className="h-10 w-10"
                              alt=""
                            />
                          ) : (
                            "---"
                          )}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.title ? faq?.title : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.price ? faq?.price : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.user?.name ? faq?.user?.name : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.category?.title ? faq?.category?.title : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.publicationDate
                            ? format(
                                parseISO(faq?.publicationDate),
                                "yyyy-MM-dd"
                              )
                            : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          {faq?.location ? faq?.location : "---"}
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          <div>
                            <Dropdown
                              label={
                                faq?.availability.charAt(0).toUpperCase() +
                                faq?.availability.slice(1)
                              }
                              size="sm"
                              style={{
                                backgroundColor: "white",
                                color: "black",
                                border: "1px solid black",
                                width: "170px",
                              }}
                            >
                              <Dropdown.Item
                                onClick={() => {
                                  statusChange(faq?.id, "Available");
                                }}
                              >
                                Available
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  statusChange(faq?.id, "Not Available");
                                }}
                              >
                                Not Available
                              </Dropdown.Item>
                            </Dropdown>
                          </div>
                        </Table.Cell>
                        <Table.Cell
                          className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                        >
                          <div className="flex gap-2 text-lg">
                            <Link
                              href={`/services/view/${faq?.id}`}
                              target="_blank"
                            >
                              <BsEyeFill className="text-slate-800" />
                            </Link>
                            <AiFillEdit
                              onClick={() => {
                                router.push(
                                  `/dashboard/admin/manage-service/edit/${faq?.id}`
                                );
                              }}
                              className="cursor-pointer text-blue-600"
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
            </section>
          )}
        </section>
      )}
    </>
  );
};

export default ServiceList;
