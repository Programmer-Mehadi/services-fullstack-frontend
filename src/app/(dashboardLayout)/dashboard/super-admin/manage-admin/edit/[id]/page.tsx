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

  return <div className="text-center py-14 text-3xl ">Cannot Edit Admin</div>;
};

export default ManageAdminEditPage;
