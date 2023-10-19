"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ServiceCard from "@/components/ui/ServiceCard";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ServicesHomePage = () => {
  const [serviceList, setServiceList] = React.useState(null);
  useEffect(() => {
    axios
      .get(serverURL + "/service/get-public-list")
      .then((res) => {
        setServiceList(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, []);

  return (
    <section className="min-h-[90vh]">
      {serviceList === null ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <SpinLoader />
        </div>
      ) : (
        <>
          {serviceList?.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <h1 className="text-2xl text-center font-bold  py-8 text-gray-900 dark:text-white">
                No services found
              </h1>
            </div>
          ) : (
            <>
              {
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {serviceList?.map((service: any) => {
                    return <ServiceCard key={service.id} data={service} />;
                  })}
                </div>
              }
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ServicesHomePage;
