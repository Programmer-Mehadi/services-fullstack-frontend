"use client";
// @ts-ignore
import FormInput from "@/components/Forms/Fields/FormInput";
import UploadImage from "@/components/Forms/Fields/UploadImage";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {Button, Card, Select, TextInput, ToggleSwitch} from "flowbite-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
const CreateServicePage = () => {
  const router = useRouter();
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
  const [upcoming, setUpcoming] = useState<boolean | string | number | any>(
    false
  );
  const [serviceListLength, setServiceListLength] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const {
    setValue,
    watch,
    reset,
    register,
    handleSubmit,
    unregister,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      features: [],
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
    formData.append("upcoming", upcoming);
    try {
      const result = await axios.post(serverURL + "/service", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: getLocalStorage("service-website-token"),
        },
      });
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
                {...register("categoryID", {required: true})}
                style={{
                  maxHeight: "200px",
                  overflow: "auto",
                  border: `${errors["categoryID"] ? " 1px solid red " : ""}`,
                }}
              >
                <option className="text-base py-1" value="" selected>
                  Select Category
                </option>
                {categoryList.map(
                  (item: {id: string; title: string}, index) => (
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
              <InputLabel
                title="Service Availability"
                style={{
                  height: "fit-content",
                }}
              />
              <Select
                id="availability"
                {...register("availability", {required: true})}
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
              <InputLabel title="Location" />
              <Select
                id="location"
                {...register("location", {required: true})}
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
            <div className="grid gap-1 lg:col-span-1 xl:col-span-2">
              <InputLabel title="Service Description" />
              <FormInput
                type="textArea"
                register={register}
                name="description"
                isRequired="true"
                errors={errors}
              />
            </div>
            <div className="grid gap-1 lg:col-span-1 xl:col-span-2">
              <InputLabel title="Upcoming" />
              <ToggleSwitch checked={upcoming} onChange={setUpcoming} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                onClick={() => setServiceListLength([...serviceListLength, {}])}
              >
                <AiOutlinePlus className="text-lg  text-white font-bold" />
              </Button>
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
