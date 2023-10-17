"use client";

import FormInput from "@/components/Forms/Fields/FormInput";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
export default function AddCategoryModal({
  isOpen = false,
  setOpenModal,
  props,
  reFetch,
  setReFetch,
}: {
  isOpen?: boolean | string;
  setOpenModal?: any;
  props?: any;
  reFetch?: boolean;
  setReFetch?: any;
}) {
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function formSubmit(data: any) {
    try {
      const result = await axios.post(serverURL + "/category", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: getLocalStorage("service-website-token"),
        },
      });

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
        <Modal.Header>Add New Category</Modal.Header>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Modal.Body>
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
