"use client"

import { useRouter } from "next/navigation"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Button } from "flowbite-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlinePlus } from "react-icons/ai"

import CategoryListTable from "./_sections/CategoryListTable"
import AddCategoryModal from "./_sections/AddCategoryModal"
import EditCategoryModal from "./_sections/EditCategoryModal"
const ManageCategoryPage = () => {
  const router = useRouter()

  const [dataList, setDataList] = useState(null)
  const [reFetch, setReFetch] = useState(false)

  const [openAddModal, setOpenAddModal] = useState<string | boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<string | boolean>(false)
  const [editId, setEditId] = useState<string>("")

  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || ""
    const fetchData = async () => {
      const infoData = await axios.get(serverURL + "/category/get-all", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      if (infoData?.data?.data) {
        setDataList(infoData.data.data)
      } else {
        toast.error(infoData?.data?.message)
      }
    }
    fetchData()
  }, [reFetch])

  return (
    <div
      style={{
        padding: "20px",
        overflowX: "auto",
      }}
    >
      <div className="flex justify-end pb-8">
        <Button
          className="bg-blue-700"
          size="sm"
          onClick={() => setOpenAddModal(true)}
        >
          <AiOutlinePlus className="text-white font-bold text-base mr-3" />
          Add Category
        </Button>
      </div>
      <CategoryListTable
        dataList={dataList}
        reFetch={reFetch}
        setReFetch={setReFetch}
        setOpenEditModal={setOpenEditModal}
        setEditId={setEditId}
      />
      {openAddModal && (
        <AddCategoryModal
          isOpen={openAddModal}
          setOpenModal={setOpenAddModal}
          reFetch={reFetch}
          setReFetch={setReFetch}
        />
      )}
      {openEditModal && (
        <EditCategoryModal
          isOpen={openEditModal}
          setOpenModal={setOpenEditModal}
          reFetch={reFetch}
          setReFetch={setReFetch}
          editId={editId}
        />
      )}
    </div>
  )
}

export default ManageCategoryPage
