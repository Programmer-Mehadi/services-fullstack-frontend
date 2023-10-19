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
import ManageReviewList from "./_sections/ManageReviewList";
const ManageReviewPage = () => {
  const router = useRouter();

  const [dataList, setDataList] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || "";
    const fetchData = async () => {
      const dataInfo = await axios.get(serverURL + "/review/get-all", {
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
      <div className="flex justify-end pb-8">
        <Link href="/dashboard/user/manage-review/create">
          <Button className="bg-blue-700" size="sm">
            <AiOutlinePlus className="text-white font-bold text-base mr-3" />
            Add Review
          </Button>
        </Link>
      </div>
      <ManageReviewList
        dataList={dataList}
        reFetch={reFetch}
        setReFetch={setReFetch}
      />
    </div>
  );
};

export default ManageReviewPage;
