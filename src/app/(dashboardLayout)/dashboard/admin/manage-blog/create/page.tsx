"use client";

import DropDown from "@/components/Forms/Fields/DropDown";
import FormInput from "@/components/Forms/Fields/FormInput";
import UploadImage from "@/components/Forms/Fields/UploadImage";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {Card} from "flowbite-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

const BlogCreatePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {errors},
  } = useForm();

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
  const formSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("status", data.status);
    formData.append("image", data.image[0]);
    axios
      .post(serverURL + "/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      .then((result) => {
        if (result?.data?.statusCode || result?.data?.success) {
          setLoading(false);
          toast.success(result?.data?.message);
          reset();
          router.push("/dashboard/admin/manage-blog");
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
  return (
    <div className="lg:py-14">
      <Card
        className="w-full max-w-[600]"
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h2 className="text-2xl font-semibold ">Create Blog</h2>
        <hr />
        <form className="mt-8 grid gap-3" onSubmit={handleSubmit(formSubmit)}>
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
            <InputLabel title="Image" />
            <UploadImage
              isRequired="true"
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
            title="Add Blog"
            disabled={loading}
            style={{
              marginTop: "20px",
              width: "fit-content",
            }}
          />
        </form>
      </Card>
    </div>
  );
};

export default BlogCreatePage;
