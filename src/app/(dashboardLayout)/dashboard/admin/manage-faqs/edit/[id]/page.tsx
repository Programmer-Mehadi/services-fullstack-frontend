"use client"

import FormInput from "@/components/Forms/Fields/FormInput"
import InputLabel from "@/components/Forms/Labels/InputLabel"
import SubmitButton from "@/components/ui/Buttons/SubmitButton"
import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import DropDown from "@/components/Forms/Fields/DropDown"
import { Card } from "flowbite-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
const ManageFaqEditPage = () => {
  const { id } = useParams()
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
      ques: "",
      ans: "",
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
        const result = await axios.get(`${serverURL}/faq/get/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        })
        if (result?.data?.success) {
          setData(result?.data?.data)
          setValue("status", result?.data?.data?.status)
          setValue("ques", result?.data?.data?.ques)
          setValue("ans", result?.data?.data?.ans)
        } else {
          toast.error(result?.data?.message)
        }
      } catch (err) {}
    }

    fetchData()
  }, [id])

  const formSubmit = async (data: any) => {
    setLoading(true)
    axios
      .put(serverURL + `/faq/update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      .then((result) => {
        if (result?.data?.statusCode || result?.data?.success) {
          setLoading(false)
          toast.success(result?.data?.message)
          reset()
          router.push("/dashboard/admin/manage-faqs")
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
                maxWidth: "800px",
                margin: "auto",
              }}
            >
              <h2 className="text-2xl font-semibold ">Create FAQ</h2>
              <hr />
              <form
                className="mt-8 grid gap-3"
                onSubmit={handleSubmit(formSubmit)}
              >
                <div className="grid gap-1">
                  <InputLabel title="Question" style={{}} />
                  <FormInput
                    setValue={setValue}
                    name="ques"
                    size="large"
                    placeholder="Give a question"
                    type="text"
                    isRequired="true"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="grid gap-1">
                  <InputLabel title="Answer" style={{}} />
                  <FormInput
                    setValue={setValue}
                    name="ans"
                    size="large"
                    placeholder="Type your answer"
                    type="textArea"
                    isRequired="true"
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
                        ? "Select Role"
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
                  title="Submit"
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

export default ManageFaqEditPage
