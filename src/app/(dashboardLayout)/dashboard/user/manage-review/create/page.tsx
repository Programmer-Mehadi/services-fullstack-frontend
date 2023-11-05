"use client";

import FormInput from "@/components/Forms/Fields/FormInput";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {Card, Rating, Select} from "flowbite-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
const ReviewCreatePage = () => {
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

  const [serviceList, setServiceList] = useState<null | []>(null);
  const [selectedService, setSelectedService] = useState<{} | any>({});
  const [rating, setRating] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const token: string = getLocalStorage("service-website-token") || "";
        const result = await axios.get(serverURL + "/booking/get-all", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        if (result?.data?.success) {
          setServiceList(result?.data?.data);
        }
      } catch (err) {
        setServiceList([]);
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, []);

  const formSubmit = async (data: any) => {
    setLoading(true);
    data.rating = rating;
    data.serviceId = selectedService?.id;
    axios
      .post(serverURL + "/review", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      })
      .then((result) => {
        if (result?.data?.statusCode || result?.data?.success) {
          setLoading(true);
          toast.success(result?.data?.message);
          reset();
          router.push("/dashboard/user/manage-review");
        } else {
          
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
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h2 className="text-2xl font-semibold ">Give Review</h2>
        <hr />
        <form className="mt-8 grid gap-3" onSubmit={handleSubmit(formSubmit)}>
          <div className="grid gap-1">
            <InputLabel title="Service Name" />
            <Select
              id="service"
              {...register("serviceId", {required: true})}
              defaultValue={selectedService?.id}
              style={{
                maxHeight: "200px",
                overflow: "auto",
                border: `${errors["serviceId"] ? " 1px solid red " : ""}`,
              }}
              onChange={(e) =>
                setSelectedService({
                  id: e.target.value,
                })
              }
            >
              <option className="text-base py-1" value="" selected>
                Select Service
              </option>
              {serviceList?.map((item: any, index: number) => (
                <option
                  key={index}
                  value={item?.service?.id}
                  className="text-base py-1"
                >
                  {item?.service?.title}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-1">
            <InputLabel title="Give a Review" style={{}} />
            <FormInput
              setValue={setValue}
              name="review"
              size="large"
              placeholder="Type your feedback"
              type="textArea"
              isRequired="true"
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid gap-1">
            <InputLabel title="Give a Rating?" style={{}} />
            <div className="flex gap-2 text-base">
              <Rating size="lg">
                <Rating.Star
                  onClick={() => {
                    if (rating === 1) {
                      setRating(0);
                      return;
                    }
                    setRating(1);
                  }}
                  filled={rating >= 1 ? true : false}
                />
                <Rating.Star
                  onClick={() => {
                    setRating(2);
                  }}
                  filled={rating >= 2 ? true : false}
                />
                <Rating.Star
                  onClick={() => {
                    setRating(3);
                  }}
                  filled={rating >= 3 ? true : false}
                />
                <Rating.Star
                  onClick={() => {
                    setRating(4);
                  }}
                  filled={rating >= 4 ? true : false}
                />
                <Rating.Star
                  onClick={() => {
                    setRating(5);
                  }}
                  filled={rating >= 5 ? true : false}
                />
              </Rating>
            </div>
          </div>
          <SubmitButton
            title="Submit"
            disabled={loading}
            className="px-5"
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

export default ReviewCreatePage;
