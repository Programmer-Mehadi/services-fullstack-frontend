"use client";

import DropDown from "@/components/Forms/Fields/DropDown";
import FormInput from "@/components/Forms/Fields/FormInput";
import UploadImage from "@/components/Forms/Fields/UploadImage";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Button, Card, Label, Radio, Select, TextInput } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
const EditServicePage = () => {
  const router = useRouter();
  const param = useParams();
  const bangladeshDistricts = [
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barishal",
    "Bhola",
    "Bogra",
    "Brahmanbaria",
    "Chandpur",
    "Chapainawabganj",
    "Chattogram",
    "Chuadanga",
    "Comilla",
    "Cox's Bazar",
    "Dhaka",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gazipur",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jashore (Jessore)",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Madaripur",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Natore",
    "Nawabganj",
    "Netrokona",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Satkhira",
    "Shariatpur",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
    "Thakurgaon",
  ];

  const [serviceListLength, setServiceListLength] = useState([]);
  const [categoryList, setCategoryList] = useState(null);
  const [previousData, setPreviousData] = useState<null | {} | any>(null);
  const {
    setValue,
    watch,
    reset,
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      availability: "",
      features: "",
      image: "",
      location: "",
      price: "",
      title: "",
      description: "",
      categoryID: "",
    },
  });

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

  // fetch previous data
  useEffect(() => {
    async function fetchPreviousData() {
      axios
        .get(serverURL + `/service/get/${param.serviceID}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        })
        .then((res) => {
          if (res?.data?.data) {
            setValue("id", res?.data?.data?.id);
            setValue("availability", res?.data?.data?.availability);
            setValue("features", res?.data?.data?.features);
            setValue("image", res?.data?.data?.image);
            setValue("location", res?.data?.data?.location);
            setValue("price", res?.data?.data?.price);
            setValue("title", res?.data?.data?.title);
            setValue("description", res?.data?.data?.description);
            setValue("categoryID", res?.data?.data?.category?.id);
            let featuresArray = res?.data?.data?.features?.split("///");
            if (featuresArray.length > 1) {
              featuresArray = featuresArray.slice(1);
              let features: { title: string }[] = [];
              featuresArray.forEach((feature: any) => {
                features.push({
                  title: feature,
                });
              });
              setServiceListLength(features);
            }
            setPreviousData(res?.data?.data);
          } else {
            setPreviousData({});
          }
        })
        .catch((err) => {
          console.log("Something went wrong");
          setPreviousData({});
        });
    }

    fetchPreviousData();
  }, [param.serviceID]);

  async function addService(data: any) {
    data.features = serviceListLength;
    try {
      let price = parseFloat(data.price);
      if (Number.isNaN(price)) {
        toast.error("Price Must be a number or float.");
        return;
      }
    } catch (err) {
      toast.error("Price Must be a number or float.");
      return;
    }

    let featuresText = "";
    data.features.forEach((feature: any) => {
      featuresText += `///${feature.title}`;
    });

    data.features = featuresText;

    const formData = new FormData();
    formData.append("features", data.features);
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryID);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("availability", data.availability);
    formData.append("location", data.location);

    try {
      const result = await axios.put(
        serverURL + `/service/update/${param.serviceID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: getLocalStorage("service-website-token"),
          },
        }
      );
      if (result?.data?.success) {
        router.push("/dashboard/admin/manage-service");
        reset();
        toast.success(result?.data?.message);
      } else {
        toast.success(result?.data?.message);
      }
    } catch (err) {
      toast(err?.response?.data?.message);
    }
  }

  return (
    <>
      {previousData === null || categoryList === null ? (
        <div className="flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <section>
          <Card>
            <h1 className="text-2xl font-bold pb-8">Create New Service</h1>
            <form className="grid gap-5" onSubmit={handleSubmit(addService)}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="grid gap-1 h-fit">
                  <InputLabel title="Service Title" />
                  <FormInput
                    type="text"
                    isRequired="true"
                    register={register}
                    name="title"
                    errors={errors}
                  />
                </div>
                <div className="grid gap-1 h-fit">
                  <InputLabel title="Service Category" />
                  <Select
                    id="category"
                    {...register("categoryID", { required: true })}
                    style={{
                      maxHeight: "200px",
                      overflow: "auto",
                      border: `${
                        errors["categoryID"] ? " 1px solid red " : ""
                      }`,
                    }}
                    defaultValue={previousData?.category?.id}
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
                <div className="grid gap-1 h-fit">
                  <InputLabel title="Service Image" />
                  <UploadImage
                    name="image"
                    register={register}
                    errors={errors}
                    isRequired="false"
                  />
                  <div>
                    <span className="text-sm text-green-700">
                      Previous Image
                    </span>
                    <img
                      src={previousData?.image}
                      className="w-10 h-10"
                      alt=""
                    />
                  </div>
                </div>
                <div className="grid gap-1 h-fit">
                  <InputLabel
                    title="Service Availability"
                    style={{
                      height: "fit-content",
                    }}
                  />
                  <Select
                    id="availability"
                    {...register("availability", { required: true })}
                    style={{
                      maxHeight: "200px",
                      overflow: "auto",
                      border: `${
                        errors["availability"] ? " 1px solid red " : ""
                      }`,
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
                  <InputLabel title="Location" />
                  <Select
                    id="location"
                    {...register("location", { required: true })}
                    style={{
                      maxHeight: "200px",
                      overflow: "auto",
                      border: `${errors["location"] ? " 1px solid red " : ""}`,
                    }}
                  >
                    <option className="text-base py-1" value="" selected>
                      Select Location
                    </option>
                    {bangladeshDistricts.map((d, i) => {
                      return (
                        <option key={i} className="text-base py-1" value={d}>
                          {d}
                        </option>
                      );
                    })}
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
                <div className="grid gap-1 lg:col-span-1 xl:col-span-2 h-fit">
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-fit">
                <div className="grid gap-1">
                  <InputLabel title="Service Features" />
                  {serviceListLength.map((item, index) => (
                    <div className="flex justify-between gap-2" key={index}>
                      <TextInput
                        id={`email${index}`}
                        placeholder="Type feature"
                        type="text"
                        value={item?.title}
                        style={{
                          width: "100%",
                        }}
                        className="flex-1"
                        onChange={(e) => {
                          let newList = [];
                          serviceListLength.forEach((item, i) => {
                            if (index === i) {
                              item = {
                                title: e.target.value,
                              };
                              newList.push(item);
                            } else {
                              newList.push(item);
                            }
                          });
                          setServiceListLength([...newList]);
                        }}
                      />
                      <Button
                        color="failure"
                        onClick={() => {
                          const newList = serviceListLength.filter(
                            (item, i) => index !== i
                          );
                          setServiceListLength([...newList]);
                        }}
                      >
                        <AiOutlineMinus className="text-lg  text-white font-bold" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    style={{
                      width: "fit-content",
                    }}
                    onClick={() =>
                      setServiceListLength([...serviceListLength, {}])
                    }
                  >
                    <AiOutlinePlus className="text-lg  text-white font-bold" />
                  </Button>
                </div>
              </div>

              <SubmitButton
                title="Update Service"
                style={{
                  width: "fit-content",
                }}
              />
            </form>
          </Card>
        </section>
      )}
    </>
  );
};

export default EditServicePage;
