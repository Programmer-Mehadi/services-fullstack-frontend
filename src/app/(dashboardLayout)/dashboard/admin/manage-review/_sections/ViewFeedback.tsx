"use client";

import FormInput from "@/components/Forms/Fields/FormInput";
import InputLabel from "@/components/Forms/Labels/InputLabel";
import SubmitButton from "@/components/ui/Buttons/SubmitButton";
import { getLocalStorage, setLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Card, Modal, Rating, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DropDown from "@/components/Forms/Fields/DropDown";
import { useParams, useRouter } from "next/navigation";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { BiHappyBeaming, BiSad } from "react-icons/bi";

const ViewFeedback = ({ id = null, closeModal = (v) => {} }) => {
  const [previousData, setPreviousData] = useState<null | {}>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token: string = getLocalStorage("service-website-token") || "";
        const result = await axios.get(serverURL + "/review/get/" + id, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        if (result?.data?.success) {
          setPreviousData(result?.data?.data);
        }
      } catch (err) {
        setPreviousData({});
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {previousData === null ? (
        <div className="flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <Modal
          show={true}
          className="z-50"
          dismissible
          onClose={() => {
            closeModal(false);
          }}
        >
          <Modal.Header>
            <h2 className="text-2xl font-semibold ">View Review</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-2 grid gap-3">
              <div className="grid gap-1">
                <InputLabel title="Service Name" />
                <FormInput
                  name="review"
                  size="large"
                  placeholder="Type your feedback"
                  type="text"
                  isRequired="true"
                  value={
                    previousData?.service?.title
                      ? previousData?.service?.title
                      : "---"
                  }
                  readOnly={true}
                />
              </div>
              <div className="grid gap-1">
                <InputLabel title="Give a Feedback" style={{}} />
                <FormInput
                  name="review"
                  size="large"
                  placeholder="Type your feedback"
                  type="textArea"
                  className="h-40"
                  isRequired="true"
                  value={previousData?.review ? previousData?.review : "---"}
                  readOnly={true}
                />
              </div>
              <div className="grid gap-1">
                <InputLabel title="Give Rating" style={{}} />
                <div className="flex gap-2 text-base">
                  <div className="flex gap-2 text-base">
                    {previousData?.rating}
                    <Rating>
                      <Rating.Star />
                    </Rating>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ViewFeedback;
