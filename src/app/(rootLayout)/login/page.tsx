"use client";

import FormInput from "@/components/Forms/Fields/FormInput";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import UploadImage from "@/components/Forms/Fields/UploadImage";
import { serverURL } from "@/utils/serverUrl";

import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import { setLocalStorage } from "@/utils/local-storage";
import { isLoggedIn } from "@/services/auth.services";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { Dropdown } from "flowbite-react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
const LoginPage = () => {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLogIn(isLoggedIn());
  }, []);

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data: any) => {
    setLoading(true);

    axios
      .post(serverURL + "/auth/login", data)
      .then((result) => {
        if (result?.data?.statusCode || result?.data?.success) {
          setLoading(false);
          setLocalStorage("service-website-token", result?.data?.token);
          toast.success(result?.data?.message);
          // reset();
          router.push("/");
        } else {
          console.log("error");
          setLoading(false);
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        err?.response?.data?.errorMessages.forEach((element: any) => {
          element?.message && toast.error(element?.message);
        });
        setLoading(false);
      });
  };

  if (isLogIn) {
    router.push("/");
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
    );
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
              style={{ width: "100%", marginTop: 20 }}
              disabled={loading}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
