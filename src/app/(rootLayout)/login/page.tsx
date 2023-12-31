"use client"
// @ts-ignore
import FormInput from "@/components/Forms/Fields/FormInput"
import SubmitButton from "@/components/ui/Buttons/SubmitButton"
import { serverURL } from "@/utils/serverUrl"

import InputLabel from "@/components/Forms/Labels/InputLabel"
import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { setUser } from "@/redux/slices/userSlice"
import { getUserInfo, isLoggedIn } from "@/services/auth.services"
import { setLocalStorage } from "@/utils/local-storage"
import axios from "axios"
import { Card } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
const LoginPage = () => {
  const router = useRouter()
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null)

  useEffect(() => {
    setIsLogIn(isLoggedIn())
    if (isLogIn) {
      router.push("/")
    }
  }, [])

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const formSubmit = async (data: any) => {
    setLoading(true)

    axios
      .post(serverURL + "/auth/login", data)
      .then((result) => {
        if (result?.data?.statusCode || result?.data?.success) {
          setLoading(true)
          setLocalStorage("service-website-token", result?.data?.token)
          toast.success(result?.data?.message)
          reset()
          const userInfo = getUserInfo()
          dispatch(setUser(userInfo))
          router.push("/")
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
          padding: "0px 0px 0px 0px",
        }}
      >
        <Card
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
              <h1 className="text-3xl font-bold">Please Login</h1>
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

            <SubmitButton
              title="Login"
              style={{
                width: "fit-content",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
              className="text-center flex justify-center px-3"
              disabled={loading}
            />
            <div>
              <p className="text-sm">
                Haven{"'"}t an account?{" "}
                <Link href="/register" className="text-blue-700 w-fit">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
