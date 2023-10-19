"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ServiceDetails from "../../_view/ServiceDetails";

const SingleServicePage = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = React.useState(null);

  useEffect(() => {
    axios
      .get(serverURL + "/service/get/" + id)
      .then((res) => {
        setServiceData(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, [id]);

  return (
    <section className="min-h-[80vh]">
      {serviceData === null ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <SpinLoader />
        </div>
      ) : (
        <>
          <div className="container mx-auto p-4">
            <ServiceDetails data={serviceData} />
          </div>
        </>
      )}
    </section>
  );
};

export default SingleServicePage;
