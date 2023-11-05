"use client"

import DropDown from "@/components/Forms/Fields/DropDown"
import FormInput from "@/components/Forms/Fields/FormInput"
import UploadImage from "@/components/Forms/Fields/UploadImage"
import InputLabel from "@/components/Forms/Labels/InputLabel"
import SubmitButton from "@/components/ui/Buttons/SubmitButton"
import { getLocalStorage } from "@/utils/local-storage"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Card } from "flowbite-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const ManageAdminAddPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "admin",
    },
  })
  const roleList = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Super Admin",
      value: "super_admin",
    },
  ]
  const formSubmit = async (data: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("profileImg", data.profileImg[0])
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("contactNo", data.contactNo)
    formData.append("address", data.address)
    formData.append("role", data.role)

    try {
      const result = await axios.post(
        serverURL + "/user/create-admin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: getLocalStorage("service-website-token") || "",
          },
        }
      )

      if (result?.data?.statusCode || result?.data?.success) {
        setLoading(false)
        toast.success(result?.data?.message)
        reset()
        router.push("/dashboard/super-admin/manage-admin")
      } else {
        setLoading(false)
        toast.error("Something went wrong")
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)

      err?.response?.data?.errorMessages?.forEach((item: any) => {
        toast.error(item?.message)
      })
    }
  }

  return (
    <div
      style={{
        padding: "0px 20px",
        marginTop: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            maxWidth: 600,
            margin: "auto",
            width: "100%",
            padding: "0px 0px 50px 0px",
          }}
        >
          <div
            style={{
              padding: "0px",
              height: "fit-content",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <div>
              <h1 className="text-3xl font-bold">Create New Admin</h1>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(formSubmit)}
            style={{
              width: "100%",
              display: "grid",
              gap: "18px",
            }}
          >
            <div>
              <InputLabel title="Full Name" style={{}} />
              <FormInput
                setValue={setValue}
                name="name"
                size="large"
                placeholder="Full name"
                type="text"
                isRequired="true"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <InputLabel title="Email" style={{}} />
              <FormInput
                setValue={setValue}
                name="email"
                size="large"
                placeholder="Email"
                type="email"
                isRequired="true"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <InputLabel title="Password" style={{}} />
              <FormInput
                setValue={setValue}
                name="password"
                size="large"
                placeholder="Password"
                type="password"
                isRequired="true"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <InputLabel title="Contact Number" style={{}} />
              <FormInput
                setValue={setValue}
                name="contactNo"
                size="large"
                placeholder="Contact Number"
                type="number"
                isRequired="true"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <InputLabel title="Address" style={{}} />
              <FormInput
                setValue={setValue}
                name="address"
                size="large"
                placeholder="Address"
                type="text"
                isRequired="true"
                register={register}
                errors={errors}
              />
            </div>
            <div className="w-full">
              <DropDown
                name="role"
                style={{}}
                isRequired="false"
                register={register}
                errors={errors}
                label={
                  watch("role") === "" || watch("role") === undefined
                    ? "Select Role"
                    : watch("role")
                }
                size="sm"
                itemList={roleList}
                setValue={setValue}
              />
            </div>
            <div>
              <InputLabel title="Profile Image" style={{}} />
              <UploadImage
                name="profileImg"
                style={{ width: "100%" }}
                isRequired="false"
                register={register}
                errors={errors}
              />
            </div>
            <SubmitButton
              title="Create Admin"
              style={{ width: "fit-content", marginTop: 20 }}
              disabled={loading}
            />
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ManageAdminAddPage
