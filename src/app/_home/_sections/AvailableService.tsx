"use client";

import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { getLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import { serverURL } from "@/utils/serverUrl";
import toast from "react-hot-toast";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { Card } from "flowbite-react";
import ServiceCard from "@/components/ui/ServiceCard";
const AvailableService = () => {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const token: string = getLocalStorage("service-website-token") || "";
      try {
        const fdata = await axios.get(
          serverURL + "/service/available-service",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        );
        setData(fdata?.data?.data);
      } catch (err) {
        console.log(err);
        toast.error("Available Service Cannot Be Loaded");
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      {data === null ? (
        <div className="flex justify-center items-center h-[300px]">
          <SpinLoader />
        </div>
      ) : (
        <div className="px-4 py-16 mx-auto md:px-24 lg:px-8 lg:py-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white pb-14 text-center">
            Available Service
          </h2>
          {/* list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-y-auto py-10 pb-0">
            {data === null ? (
              <div className="flex justify-center items-center h-[300px]">
                <SpinLoader />
              </div>
            ) : (
              <>
                {data?.length === 0 ? (
                  <h1 className="text-center text-xl md:col-span-2 lg:col-span-3 xl:col-span-4">
                    No Data Found
                  </h1>
                ) : (
                  <>
                    {data?.map((item: any) => (
                      <ServiceCard key={item?.id} data={item} />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AvailableService;