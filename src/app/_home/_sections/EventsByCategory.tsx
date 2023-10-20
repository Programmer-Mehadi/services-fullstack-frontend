"use client";

import React, {useEffect} from "react";
// Import Swiper React components

// Import Swiper styles
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ServiceCard from "@/components/ui/ServiceCard";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {Card} from "flowbite-react";
import toast from "react-hot-toast";
import "swiper/css";
const EventsByCategory = () => {
  const [data, setData] = React.useState<any>(null);
  const [categoryList, setCategoryList] = React.useState<any>(null);
  const [selectCategory, setSelectCategory] = React.useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      const token: string = getLocalStorage("service-website-token") || "";
      try {
        const fdata = await axios.get(serverURL + "/category/get-all-list", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        setCategoryList(fdata?.data?.data);
      } catch (err) {
        setCategoryList([]);
        // toast.error("Upcoming Service Cannot Be Loaded");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setData(null);
      const token: string = getLocalStorage("service-website-token") || "";
      try {
        const fdata = await axios.get(
          serverURL + "/service/service-by-category/" + selectCategory,
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
        toast.error("Upcoming Service Cannot Be Loaded");
      }
    }

    if (selectCategory) {
      fetchData();
    } else {
      setData([]);
    }
  }, [selectCategory]);

  return (
    <section>
      {categoryList === null ? (
        <div className="flex justify-center items-center h-[300px]">
          <SpinLoader />
        </div>
      ) : (
        <div className="px-4 py-16 mx-auto md:px-24 lg:px-8 lg:py-0">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white pb-14 text-center">
            Events By Category
          </h2>
          <div className="flex gap-4 overflow-y-auto">
            {categoryList?.map((item: any) => (
              <div key={item?.id}>
                <Card
                  className="min-w-[300px] cursor-pointer"
                  onClick={() => setSelectCategory(item?.id)}
                >
                  <div className="flex flex-row items-center gap-4 ">
                    <img src={item?.image} className="w-14 h-14" alt="" />
                    <span>{item?.title}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          {/* list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-y-auto py-10">
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

export default EventsByCategory;
