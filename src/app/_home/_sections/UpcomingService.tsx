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
const UpcomingService = () => {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const token: string = getLocalStorage("service-website-token") || "";
      try {
        const fdata = await axios.get(serverURL + "/service/upcoming-service", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        setData(fdata?.data?.data);
      } catch (err) {
        console.log(err);
        toast.error("Upcoming Service Cannot Be Loaded");
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
            Upcoming Service
          </h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data &&
              data?.map((item: any, i: number) => (
                <SwiperSlide key={i}>
                  <ServiceCard data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default UpcomingService;
