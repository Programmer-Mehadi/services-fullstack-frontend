"use client"

import DropDown from "@/components/Forms/Fields/DropDown"
import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Dropdown, Table } from "flowbite-react"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"

const CategoryListTable = ({
  dataList: data,
  reFetch,
  setReFetch,
  setOpenEditModal,
  setEditId,
}: {
  dataList: any
  reFetch: any
  setReFetch: any
  setOpenEditModal: any
  setEditId: any
}) => {
  const router = useRouter()

  async function deleteData(id: any) {
    try {
      const result = await axios.delete(serverURL + `/category/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      if (result.data?.data) {
        setReFetch(!reFetch)
        toast.success(result.data?.message)
      } else {
        toast.error(result.data?.message)
      }
    } catch (err) {
      toast.error("Something went wrong")
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
                  Image
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-800 text-white">
                  Title
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-800 text-white">
                  Author Name
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-800 text-white">
                  <span>Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y border">
                {data.map((item: any, index: number) => {
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
                        {item?.image ? (
                          <img src={item?.image} className="w-10 h-10" alt="" />
                        ) : (
                          "---"
                        )}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {item?.title ? ` ${item?.title}` : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {item?.user?.name ? ` ${item?.user?.name}` : "---"}
                      </Table.Cell>

                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        <div className="flex gap-2 text-lg">
                          <AiFillEdit
                            onClick={() => {
                              setOpenEditModal(true)
                              setEditId(item?.id)
                            }}
                            className="cursor-pointer text-blue-600"
                          />
                          <AiFillDelete
                            onClick={() => {
                              deleteData(item?.id)
                            }}
                            className=" text-red-700 cursor-pointer"
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          )}
        </section>
      )}
    </>
  )
}

export default CategoryListTable
