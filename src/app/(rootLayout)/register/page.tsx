"use client"

import FormInput from "@/components/Forms/Fields/FormInput"
import UploadImage from "@/components/Forms/Fields/UploadImage"
import InputLabel from "@/components/Forms/Labels/InputLabel"
import SubmitButton from "@/components/ui/Buttons/SubmitButton"
import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { isLoggedIn } from "@/services/auth.services"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Card } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const RegisterPage = () => {
  const router = useRouter()
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null)

  useEffect(() => {
    setIsLogIn(isLoggedIn())
    if (isLogIn) {
      router.push("/")
    }
  }, [])
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const formSubmit = async (data: any) => {
    setLoading(true)
    data.role = "user"
    const formData = new FormData()
    formData.append("profileImg", data.profileImg[0])
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("role", data.role)
    formData.append("contactNo", data.contactNo)
    formData.append("address", data.address)

    try {
      const result = await axios.post(
        serverURL + "/user/user-register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      if (result?.data?.statusCode || result?.data?.success) {
        setLoading(false)
        toast.success(result?.data?.message)
        reset()
        router.push("/login")
      } else {
        setLoading(false)
        toast.error("Something went wrong")
      }
    } catch (err) {
      setLoading(false)
      toast.error("Something went wrong")
    }
  }

  if (isLogIn === null) {
    return (
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <SpinLoader />
      </section>
    )
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
              <h1 className="text-3xl font-bold">Please Register Here</h1>
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
              title="Register"
              style={{
                width: "fit-content",
                marginTop: 20,
                textAlign: "center",
              }}
              disabled={loading}
              className="px-3"
            />
            <div>
              <p className="text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-700 w-fit">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
