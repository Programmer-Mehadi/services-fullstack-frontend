"use client"

import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Dropdown, Table } from "flowbite-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai"

const ManageBlogList = ({
  dataList: data,
  reFetch,
  setReFetch,
}: {
  dataList: any
  reFetch: any
  setReFetch: any
}) => {
  const router = useRouter()

  async function statusChange(id: any, status: any) {
    try {
      const result = await axios.put(
        serverURL + `/blog/status-change/${id}`,
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

      if (result.data?.data) {
        toast.success(result.data?.message)
      } else {
        toast.error(result.data?.message)
      }
      setReFetch(!reFetch)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }
  async function deleteItem(id: any) {
    toast.error("Delete are pause for now, But the feature already done.")
    return
    try {
      const result = await axios.delete(serverURL + `/blog/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      if (result.data?.data) {
        toast.success(result.data?.message)
      } else {
        toast.error(result.data?.message)
      }
      setReFetch(!reFetch)
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
        <section className="overflow-auto pt-14">
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
                  Description
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
                {data.map((blog: any, index: number) => {
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
                        {blog?.image ? (
                          <img src={blog?.image} className="h-10 w-10" alt="" />
                        ) : (
                          <p className="text-xs textred-600">No Image</p>
                        )}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {blog?.title
                          ? blog?.title.length > 50
                            ? blog?.title.slice(0, 50) + "..."
                            : blog?.title
                          : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {blog?.desc
                          ? blog?.desc.length > 100
                            ? blog?.desc.slice(0, 100) + "..."
                            : blog?.desc
                          : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        {blog?.user?.name ? blog?.user?.name : "---"}
                      </Table.Cell>
                      <Table.Cell
                        className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                      >
                        <div>
                          <Dropdown
                            label={
                              blog?.status.charAt(0).toUpperCase() +
                              blog?.status.slice(1)
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
                                statusChange(blog?.id, "active")
                              }}
                            >
                              Active
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                statusChange(blog?.id, "inactive")
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
                          <AiFillEye
                            className="cursor-pointer text-slate-800"
                            onClick={() => {
                              router.push(
                                `/dashboard/admin/manage-blog/view/${blog?.id}`
                              )
                            }}
                          />
                          <AiFillEdit
                            onClick={() => {
                              router.push(
                                `/dashboard/admin/manage-blog/edit/${blog?.id}`
                              )
                            }}
                            className="cursor-pointer text-blue-600"
                          />
                          <AiFillDelete
                            onClick={() => {
                              deleteItem(blog?.id)
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

export default ManageBlogList
