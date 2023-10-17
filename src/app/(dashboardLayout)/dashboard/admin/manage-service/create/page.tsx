"use client";

import DropDown from "@/components/Forms/Fields/DropDown";
import FormInput from "@/components/Forms/Fields/FormInput";
import UploadImage from "@/components/Forms/Fields/UploadImage";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Button, Card, Label, Radio, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
const CreateServicePage = () => {
  const [serviceListLength, setServiceListLength] = useState([{}]);
  const [categoryList, setCategoryList] = useState([]);
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const token: string = getLocalStorage("service-website-token") || "";
        const result = await axios.get(serverURL + "/category/get-all-list", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        if (result?.data?.success) {
          setCategoryList(result?.data?.data);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, []);

  function addService(data: any) {
    console.log(data);
  }

  return (
    <section>
      <Card>
        <h1 className="text-2xl font-bold pb-8">Create New Service</h1>
        <form className="grid gap-5" onSubmit={handleSubmit(addService)}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="grid gap-1">
              <InputLabel title="Service Title" />
              <FormInput
                type="text"
                isRequired="true"
                register={register}
                name="title"
                errors={errors}
              />
            </div>
            <div className="grid gap-1">
              <InputLabel title="Service Category" />
              <Select
                id="category"
                {...register("category", { required: true })}
                style={{
                  maxHeight: "200px",
                  overflow: "auto",
                  border: `${errors["category"] ? " 1px solid red " : ""}`,
                }}
              >
                <option className="text-base py-1" value="" selected>
                  Select Category
                </option>
                {categoryList.map(
                  (item: { id: string; title: string }, index) => (
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
              <InputLabel title="Service Image" />
              <UploadImage
                name="image"
                register={register}
                errors={errors}
                isRequired="true"
              />
            </div>
            <div className="grid gap-1">
              <InputLabel title="Service Availability" />
              <Select
                id="availability"
                {...register("availability", { required: true })}
                style={{
                  maxHeight: "200px",
                  overflow: "auto",
                  border: `${errors["availability"] ? " 1px solid red " : ""}`,
                }}
              >
                <option className="text-base py-1" value="" selected>
                  Select Availability
                </option>
                <option className="text-base py-1" value="Available">
                  Available
                </option>
                <option className="text-base py-1" value="Not Available">
                  Not Available
                </option>
              </Select>
            </div>
            <div className="grid gap-1 h-fit">
              <InputLabel title="Service Price" />
              <FormInput
                type="text"
                register={register}
                name="price"
                isRequired="true"
                errors={errors}
              />
            </div>
            <div className="grid gap-1 lg:col-span-2 xl:col-span-3">
              <InputLabel title="Service Description" />
              <FormInput
                type="textArea"
                register={register}
                name="description"
                isRequired="true"
                errors={errors}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="grid gap-1">
              <InputLabel title="Service Features" />
              {serviceListLength.map((item, index) => (
                <div className="flex justify-between gap-2" key={index}>
                  <FormInput
                    type="text"
                    register={register}
                    name={`features.${index}.title`}
                  />
                  {index === serviceListLength.length - 1 ? (
                    <Button
                      onClick={() =>
                        setServiceListLength([...serviceListLength, {}])
                      }
                    >
                      <AiOutlinePlus className="text-lg  text-white font-bold" />
                    </Button>
                  ) : (
                    <Button
                      color="failure"
                      onClick={() => {
                        console.log(index);
                        const newList = serviceListLength.filter(
                          (item, i) => index !== i
                        );
                        setServiceListLength(newList);
                      }}
                    >
                      <AiOutlineMinus className="text-lg  text-white font-bold" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <SubmitButton
            title="Create Service"
            style={{
              width: "fit-content",
            }}
          />
        </form>
      </Card>
    </section>
  );
};

export default CreateServicePage;
