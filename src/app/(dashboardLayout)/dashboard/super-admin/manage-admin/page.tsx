"use client";

import ManageAdminList from "@/components/Sections/ManageAdmin/ManageAdminList";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
const ManageAdminPage = () => {
  const [dataList, setDataList] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || "";
    const fetchData = async () => {
      const userInfo = await axios.get(serverURL + "/user/get-all", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (userInfo?.data?.data) {
        setDataList(userInfo.data.data);
      } else {
        toast.error(userInfo?.data?.message);
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
        <Link href="/dashboard/super-admin/manage-admin/create">
          <Button className="bg-blue-700">
            <AiOutlinePlus className="text-white font-bold text-base mr-1" />
            Add Admin
          </Button>
        </Link>
      </div>
      <ManageAdminList
        dataList={dataList}
        reFetch={reFetch}
        setReFetch={setReFetch}
      />
    </div>
  );
};

export default ManageAdminPage;
