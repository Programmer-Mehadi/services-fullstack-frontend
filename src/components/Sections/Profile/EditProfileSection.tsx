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
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { getLocalStorage } from "@/utils/local-storage";
import { Card } from "flowbite-react";

const EditProfileSection = ({
  userData,
  reFetch,
  setReFetch,
}: {
  userData: any;
  reFetch: any;
  setReFetch: any;
}) => {
  const router = useRouter();
  const userInfo = getUserInfo();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      password: userData?.password,
      contactNo: userData?.contactNo,
      address: userData?.address,
      profileImg: null,
      id: userData?.id,
      role: userData?.role,
    },
  });

  useEffect(() => {
    setValue("name", userData?.name);
    setValue("email", userData?.email);
    setValue("password", userData?.password);
    setValue("contactNo", userData?.contactNo);
    setValue("address", userData?.address);
    setValue("profileImg", userData?.profileImg);
    setValue("id", userData?.id);
    setValue("role", userData?.role);
    setToken(getLocalStorage("service-website-token"));
  }, [userData]);

  const formSubmit = async (data: any) => {
    setLoading(false);

    // return;
    delete data.id;
    delete data.role;

    const formData = new FormData();
    if (typeof data.profileImg !== "string") {
      if (data.profileImg?.length !== 0) {
        formData.append("profileImg", data.profileImg[0]);
      }
    }

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("contactNo", data.contactNo);
    formData.append("address", data.address);

    const result = await axios.post(
      serverURL + "/profile/edit-info",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      }
    );
    if (result?.data?.statusCode || result?.data?.success) {
      setLoading(true);
      setReFetch(!reFetch);
      toast.success(result?.data?.message);
      reset();
      if (userInfo?.role === "super_admin") {
        router.push("/dashboard/super-admin/profile");
      } else if (userInfo?.role === "admin") {
        router.push("/dashboard/admin/profile");
      } else if (userInfo?.role === "user") {
        router.push("/dashboard/user/profile");
      }
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {userData === null ? (
        <div className="flex justify-center items-center py-8">
          <SpinLoader />
        </div>
      ) : (
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
                  <h1>Edit Profile</h1>
                </div>
              </div>

              <form onSubmit={handleSubmit(formSubmit)} className="grid gap-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      value={userData?.name}
                      watch={watch}
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
                      value={userData?.email}
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
                      value={userData?.password}
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
                      value={userData?.contactNo}
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
                      value={userData?.address}
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
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <InputLabel
                      title="Previous Image"
                      style={{
                        color: "green",
                      }}
                    />
                    <img
                      src={userData?.profileImg}
                      style={{ width: "50%" }}
                      alt=""
                    />
                  </div>
                </div>
                <SubmitButton
                  className="md:col-span-2 lg:col-span-3 bg-blue-500"
                  title="Update"
                  style={{ maxWidth: "300px", width: "100%", marginTop: 20 }}
                  disabled={loading}
                />
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileSection;
