"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormInput from "@/components/Forms/Fields/FormInput";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";

import { Card } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DropDown from "@/components/Forms/Fields/DropDown";
import { useRouter } from "next/navigation";
import UploadImage from "@/components/Forms/Fields/UploadImage";
const ManageBlogViewPage = () => {
  const { blogID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
  });

  const statusList = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${serverURL}/blog/get/${blogID}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        });
        if (result?.data?.success) {
          setData(result?.data?.data);
          setValue("status", result?.data?.data?.status);
          setValue("title", result?.data?.data?.title);
          setValue("desc", result?.data?.data?.desc);
        } else {
          toast.error(result?.data?.message);
        }
      } catch (err) {
        console.log("Something went wrong");
      }
    }

    fetchData();
  }, [blogID]);

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
              <h2 className="text-2xl font-semibold ">View Blog</h2>
              <hr />
              <div className="mt-8 grid gap-3">
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
                    readOnly={true}
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
                    readOnly={true}
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
                  <InputLabel title="Status" style={{}} />
                  <FormInput
                    setValue={setValue}
                    name="status"
                    size="large"
                    placeholder="Type description"
                    type="text"
                    isRequired="true"
                    register={register}
                    errors={errors}
                    readOnly={true}
                  />
                </div>

                <div
                  onClick={() => router.push("/dashboard/admin/manage-blog")}
                >
                  <SubmitButton
                    title="Back to Blog List"
                    disabled={loading}
                    style={{
                      marginTop: "20px",
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default ManageBlogViewPage;
