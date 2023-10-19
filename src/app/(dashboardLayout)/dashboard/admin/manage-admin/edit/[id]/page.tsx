"use client";

import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

const ManageAdminEditPage = () => {
  const {id} = useParams();

  const [data, setdata] = useState(null);
  useEffect(() => {
    async function fetchdata() {
      try {
        const result = await axios.get(`${serverURL}/user/admin/get/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: getLocalStorage("service-website-token"),
          },
        });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }

    fetchdata();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <h2 className="text-2xl font-bold text-rose-700 text-center">
        You can't edit this user <br />
        <span className="text-green-500 text-center">
          Only can Change the role
        </span>
      </h2>
    </div>
  );
};

export default ManageAdminEditPage;
