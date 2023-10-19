"use client";

import DropDown from "@/components/Forms/Fields/DropDown";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Dropdown, Rating, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHappyBeaming, BiSad } from "react-icons/bi";
import ViewFeedback from "./ViewFeedback";

const ManageReviewList = ({
  dataList: data,
  reFetch,
  setReFetch,
}: {
  dataList: any;
  reFetch: any;
  setReFetch: any;
}) => {
  const router = useRouter();
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewId, setViewId] = useState(null);
  async function deleteData(id: any) {
    try {
      const result = await axios.delete(serverURL + `/review/delete/${id}`, {
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
          {data?.length === 0 ? (
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
                  Author Name
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-800 text-white">
                  Review
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-800 text-white">
                  Rating
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
                        {faq?.service?.title ? faq?.service?.title : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {faq?.user?.name ? faq?.user?.name : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {faq?.review
                          ? faq?.review.length > 100
                            ? `${faq?.review.slice(0, 100)}...`
                            : faq?.review
                          : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        <div className="flex gap-2 text-base">
                          {faq?.rating}
                          <Rating>
                            <Rating.Star />
                          </Rating>
                        </div>
                      </Table.Cell>

                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        <div className="flex gap-2 text-lg">
                          <AiFillEye
                            onClick={() => {
                              setViewId(faq?.id);
                              setShowViewModal(true);
                            }}
                            className="text-slate-800 cursor-pointer"
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
          {showViewModal && (
            <ViewFeedback id={viewId} closeModal={setShowViewModal} />
          )}
        </section>
      )}
    </>
  );
};

export default ManageReviewList;
