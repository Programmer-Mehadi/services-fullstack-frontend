"use client"

import FormInput from "@/components/Forms/Fields/FormInput"
import InputLabel from "@/components/Forms/Labels/InputLabel"
import SubmitButton from "@/components/ui/Buttons/OnCLickButton"
import { getLocalStorage, setLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Card, Rating, Select } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import DropDown from "@/components/Forms/Fields/DropDown"
import { useRouter } from "next/navigation"
import { BiHappyBeaming, BiSad } from "react-icons/bi"
const FeedbackCreatePage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const [serviceList, setServiceList] = useState<null | []>(null)
  const [experience, setExperience] = useState(1)
  useEffect(() => {
    async function fetchData() {
      try {
        const token: string = getLocalStorage("service-website-token") || ""
        const result = await axios.get(serverURL + "/service/get-all-list", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        if (result?.data?.success) {
          setServiceList(result?.data?.data)
        }
      } catch (err) {
        setServiceList([])
        toast.error("Something went wrong")
      }
    }
    fetchData()
  }, [])

  const formSubmit = async (data: any) => {
    setLoading(true)
    data.experience = experience
    axios
      .post(serverURL + "/feedback", data, {
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
          router.push("/dashboard/user/manage-feedback")
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
    <div className="lg:py-14">
      <Card
        className="w-full max-w-[600]"
        style={{
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h2 className="text-2xl font-semibold ">Create Feedback</h2>
        <hr />
        <form className="mt-8 grid gap-3" onSubmit={handleSubmit(formSubmit)}>
          <div className="grid gap-1">
            <InputLabel title="Service Name" />
            <Select
              id="service"
              {...register("serviceId", { required: true })}
              style={{
                maxHeight: "200px",
                overflow: "auto",
                border: `${errors["serviceId"] ? " 1px solid red " : ""}`,
              }}
            >
              <option className="text-base py-1" value="" selected>
                Select Service
              </option>
              {serviceList?.map(
                (item: { id: string; title: string }, index: number) => (
                  <option
                    key={index}
                    value={item?.id}
                    className="text-base py-1"
                  >
                    {item?.title}
                  </option>
                )
              )}
            </Select>
          </div>
          <div className="grid gap-1">
            <InputLabel title="Give a Feedback" style={{}} />
            <FormInput
              setValue={setValue}
              name="review"
              size="large"
              placeholder="Type your feedback"
              type="textArea"
              isRequired="true"
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid gap-1">
            <InputLabel title="How was your experience?" style={{}} />
            <div className="flex gap-2 text-base">
              <BiHappyBeaming
                style={{ fontSize: "25px" }}
                className={`${experience === 1 ? "text-green-500" : ""}`}
                onClick={() => setExperience(1)}
              />
              <BiSad
                style={{ fontSize: "25px" }}
                className={`${experience === 2 ? "text-red-500" : ""}`}
                onClick={() => setExperience(2)}
              />
            </div>
          </div>
          <SubmitButton
            title="Submit"
            disabled={loading}
            className="px-5"
            style={{
              marginTop: "20px",
              width: "fit-content",
            }}
          />
        </form>
      </Card>
    </div>
  )
}

export default FeedbackCreatePage
