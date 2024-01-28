"use client"

import FormInput from "@/components/Forms/Fields/FormInput"
import InputLabel from "@/components/Forms/Labels/InputLabel"
import SubmitButton from "@/components/ui/Buttons/OnCLickButton"
import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import DropDown from "@/components/Forms/Fields/DropDown"
import UploadImage from "@/components/Forms/Fields/UploadImage"
import { Card } from "flowbite-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
const ManageBlogEditPage = () => {
  const { blogID } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      title: "",
      desc: "",
    },
  })

  const statusList = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ]
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${serverURL}/blog/get/${blogID}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        })
        if (result?.data?.success) {
          setData(result?.data?.data)
          setValue("status", result?.data?.data?.status)
          setValue("title", result?.data?.data?.title)
          setValue("desc", result?.data?.data?.desc)
        } else {
          toast.error(result?.data?.message)
        }
      } catch (err) {}
    }

    fetchData()
  }, [blogID])

  const formSubmit = async (data: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("desc", data.desc)
    formData.append("status", data.status)
    formData.append("image", data.image[0])

    axios
      .put(serverURL + `/blog/update/${blogID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      .then((result) => {
        if (result?.data?.statusCode || result?.data?.success) {
          setLoading(false)
          toast.success(result?.data?.message)
          reset()
          router.push("/dashboard/admin/manage-blog")
        } else {
          setLoading(false)
          toast.error("Something went wrong")
        }
      })
      .catch((err) => {
        err?.response?.data?.errorMessages.forEach((element: any) => {
          element?.message && toast.error(element?.message)
        })
        setLoading(false)
      })
  }

  return (
    <>
      {data === null ? (
        <div className="flex justify-center items-center py-8">
          <SpinLoader />
        </div>
      ) : (
        <>
          <div className="lg:py-14">
            <Card
              className="w-full max-w-[600]"
              style={{
                maxWidth: "900px",
                margin: "auto",
              }}
            >
              <h2 className="text-2xl font-semibold ">Update Blog</h2>
              <hr />
              <form
                className="mt-8 grid gap-3"
                onSubmit={handleSubmit(formSubmit)}
              >
                <div className="grid gap-1">
                  <InputLabel title="Title" style={{}} />
                  <FormInput
                    setValue={setValue}
                    name="title"
                    size="large"
                    placeholder="Give a title"
                    type="text"
                    isRequired="true"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="grid gap-1">
                  <InputLabel title="Description" style={{}} />
                  <FormInput
                    setValue={setValue}
                    name="desc"
                    size="large"
                    placeholder="Type description"
                    type="textArea"
                    isRequired="true"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="grid gap-1">
                  <InputLabel
                    title="Previous Image"
                    style={{
                      color: "green",
                      fontSize: "12px",
                    }}
                  />
                  <img
                    src={data?.image}
                    className="w-full max-w-[200px]"
                    alt=""
                  />
                </div>
                <div className="grid gap-1">
                  <InputLabel title="Image" />
                  <UploadImage
                    isRequired="false"
                    name="image"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="grid gap-1">
                  <InputLabel title="Status" style={{}} />
                  <DropDown
                    setValue={setValue}
                    name="status"
                    size="sm"
                    label={
                      watch("status") === "" || watch("status") === undefined
                        ? "Select Status"
                        : watch("status")
                    }
                    isRequired="true"
                    itemList={statusList}
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                </div>

                <SubmitButton
                  title="Submit Blog"
                  disabled={loading}
                  style={{
                    marginTop: "20px",
                    width: "fit-content",
                  }}
                />
              </form>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

export default ManageBlogEditPage
