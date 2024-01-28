"use client"

import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Dropdown, Table } from "flowbite-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { getUserInfo } from "../../../services/auth.services"
const ManageAdminList = ({
  dataList: data,
  reFetch,
  setReFetch,
}: {
  dataList: any
  reFetch: any
  setReFetch: any
}) => {
  const router = useRouter()
  const userInfo: any = getUserInfo()
  const roleChange = async (id: string, value: string) => {
    toast.error(
      "The role change functionality is not available yet, But the functionality is done in the backend"
    )
    return
    try {
      const result = await axios.post(
        `${serverURL}/user/role-change/${id}`,
        {
          role: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        }
      )

      if (result?.data?.statusCode || result?.data?.success) {
        setReFetch(!reFetch)
        toast.success(result?.data?.message)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err) {
      err?.response?.data?.errorMessages?.forEach((item: any) => {
        toast.error(item?.message)
      })
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
                Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Email
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Conatct No
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                Role
              </Table.HeadCell>
              <Table.HeadCell className="bg-cyan-800 text-white">
                <span>Actions</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border">
              {data.map((admin: any, index: number) => {
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
                      <div>
                        {admin?.profileImg ? (
                          <img
                            src={admin?.profileImg}
                            className="w-10 h-10"
                            alt=""
                          />
                        ) : (
                          <p className="text-red-500"> No Image </p>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      {admin?.name}
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      {admin?.email}
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      {admin?.contactNo}
                    </Table.Cell>
                    <Table.Cell
                      className={`${index % 2 === 1 ? " bg-cyan-50 " : ""}`}
                    >
                      <div>
                        <Dropdown
                          label={admin?.role}
                          size="sm"
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "1px solid black",
                          }}
                        >
                          <Dropdown.Item
                            onClick={() => {
                              roleChange(admin?.id, "admin")
                            }}
                          >
                            Admin
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              roleChange(admin?.id, "super_admin")
                            }}
                          >
                            Super Admin
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
                            if (userInfo?.role === "super_admin") {
                              router.push(
                                `/dashboard/super-admin/manage-admin/edit/${admin?.id}`
                              )
                            } else {
                              router.push(
                                `/dashboard/admin/manage-admin/edit/${admin?.id}`
                              )
                            }
                          }}
                          className="cursor-pointer text-blue-600"
                        />
                        <AiFillDelete className="cursor-not-allowed text-red-200" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </section>
      )}
    </>
  )
}

export default ManageAdminList
