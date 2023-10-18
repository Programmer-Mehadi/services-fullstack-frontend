"use client";

import { useRouter } from "next/navigation";
import ManageAdminList from "@/components/Sections/ManageAdmin/ManageAdminList";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import ManageFeedbackList from "./_sections/ManageFeedbackList";
const ManageFeedbackPage = () => {
  const router = useRouter();

  const [dataList, setDataList] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || "";
    const fetchData = async () => {
      const dataInfo = await axios.get(serverURL + "/feedback/get-all", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (dataInfo?.data?.data) {
        setDataList(dataInfo.data.data);
      } else {
        toast.error(dataInfo?.data?.message);
      }
    };
    fetchData();
  }, [reFetch]);

  return (
    <div
      style={{
        padding: "20px",
        overflowX: "auto",
      }}
    >
      <div className="flex justify-end pb-8"></div>
      <ManageFeedbackList
        dataList={dataList}
        reFetch={reFetch}
        setReFetch={setReFetch}
      />
    </div>
  );
};

export default ManageFeedbackPage;
