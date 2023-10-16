"use client";

import axios from "axios";
import ViewProfileSection from "../../../../../components/Sections/Profile/ViewProfileSection";
import { serverURL } from "@/utils/serverUrl";
import { getLocalStorage } from "@/utils/local-storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileViewPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || "";
    const fetchData = async () => {
      const userInfo = await axios.get(serverURL + "/profile/get-info", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (userInfo?.data?.data) {
        setUserData(userInfo.data.data);
      } else {
        toast.error(userInfo?.data?.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <ViewProfileSection userData={userData} />
    </div>
  );
};

export default ProfileViewPage;
