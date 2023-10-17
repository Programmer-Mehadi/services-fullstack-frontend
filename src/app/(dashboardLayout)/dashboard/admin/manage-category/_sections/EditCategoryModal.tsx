"use client";

import FormInput from "@/components/Forms/Fields/FormInput";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import UploadImage from "@/components/Forms/Fields/UploadImage";

export default function EditCategoryModal({
  isOpen = false,
  setOpenModal,
  props,
  reFetch,
  setReFetch,
  editId = "",
}: {
  isOpen?: boolean | string;
  setOpenModal?: any;
  props?: any;
  reFetch?: boolean;
  setReFetch?: any;
  editId?: string;
}) {
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      image: "",
    },
  });
  const [preData, setPreData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(serverURL + "/category/get/" + editId, {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        });
        if (result?.data?.success) {
          setValue("title", result?.data?.data?.title);
          setValue("image", result?.data?.data?.image);
          setPreData(result?.data?.data);
        } else {
          toast.error(result?.data?.message);
          setOpenModal(false);
        }
      } catch (err) {
        toast.error("Something went wrong");
        setOpenModal(false);
      }
    }

    if (editId) {
      fetchData();
    }
  }, [editId]);

  async function formSubmit(data: any) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image[0]);
      const result = await axios.put(
        serverURL + "/category/update/" + editId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: getLocalStorage("service-website-token"),
          },
        }
      );

      if (result?.data?.success) {
        toast.success(result?.data?.message);
        reset();
        setOpenModal(false);
        setReFetch(!reFetch);
      } else {
        toast.error(result?.data?.message);
      }
    } catch (err) {
      err?.response?.data?.errorMessages?.forEach((element: any) => {
        toast.error(element?.message);
      });
    }
  }

  return (
    <>
      <Modal
        dismissible
        show={isOpen === true}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Edit Category</Modal.Header>
        <form onSubmit={handleSubmit(formSubmit)} className="overflow-auto">
          <Modal.Body className="grid gap-8">
            <div className="space-y-1">
              <InputLabel title="Category Name" />
              <FormInput
                register={register}
                setValue={setValue}
                errors={errors}
                watch={watch}
                name="title"
                type="text"
                placeholder="Give a Name"
                isRequired="true"
              />
            </div>

            <div className="grid space-y-1">
              <InputLabel title="Previous Image" />
              <img src={preData?.image} className="h-20 w-20" alt="" />
            </div>

            <div className="grid space-y-1">
              <InputLabel title="Category Image" />
              <UploadImage
                register={register}
                errors={errors}
                name="image"
                isRequired="false"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="blue">
              <IoMdAdd className="text-lg mr-2" /> Add
            </Button>
            <Button color="red" onClick={() => setOpenModal(false)}>
              <AiOutlineClose className="text-lg mr-2" /> Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
