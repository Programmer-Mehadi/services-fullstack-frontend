"use client";

import React, {useEffect} from "react";
// Import Swiper React components

// Import Swiper styles
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ServiceCard from "@/components/ui/ServiceCard";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "swiper/css";
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
        // toast.error("Upcoming Service Cannot Be Loaded");
      }
    }

    fetchData();
  }, []);
  function scrollSection(x: number, y: number) {
    document.getElementsByClassName("upcoming_services_section")[0].scrollBy({
      top: y,
      left: x,
      behavior: "smooth",
    });
  }

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
          {/* list */}
          <div className="grid lg:grid-cols-[50px_1fr_50px] gap-0 pb-0 relative top-0 left-0">
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
                    <div className="hidden lg:flex items-center justify-center h-full ">
                      <BsFillArrowLeftCircleFill
                        className="cursor-pointer text-lg md:text-3xl text-[#32a852]"
                        onClick={() => {
                          scrollSection(-370, 0);
                        }}
                      />
                    </div>
                    <div className="flex-1 h-full upcoming_services_section  overflow-y-auto flex gap-8">
                      {data?.map((item: any) => (
                        <ServiceCard key={item?.id} data={item} />
                      ))}
                    </div>
                    <div className="hidden lg:flex items-center justify-center h-full">
                      <BsFillArrowRightCircleFill
                        className="cursor-pointer text-lg md:text-3xl text-[#32a852]"
                        onClick={() => {
                          scrollSection(370, 0);
                        }}
                      />
                    </div>
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

export default UpcomingService;
