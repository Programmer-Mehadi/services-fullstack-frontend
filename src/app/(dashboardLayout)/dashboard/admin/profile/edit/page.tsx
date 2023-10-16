"use client";

import EditProfileSection from "@/components/Sections/Profile/EditProfileSection";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileEditPage = () => {
  const [userData, setUserData] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    const token: string = getLocalStorage("service-website-token") || "";
    const fetchData = async () => {
      const userInfo = await axios.get(serverURL + "/profile/get-edit-info", {
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
  }, [reFetch]);

  return (
    <div>
      <EditProfileSection
        userData={userData}
        reFetch={reFetch}
        setReFetch={setReFetch}
      />
    </div>
  );
};

export default ProfileEditPage;
