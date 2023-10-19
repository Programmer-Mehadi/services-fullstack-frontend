"use client";
// @ts-ignore
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import SpinLoader from "@/components/ui/Loader/SpinLoader";

const SingleBlogPage = () => {
  const params = useParams();
  const [data, setData] = React.useState(null);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(serverURL + "/blog/get-public-single/" + params?.id)
        .then((res) => {
          setData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
    fetchData();
  }, [params?.id]);

  return (
    <div className="container mx-auto p-4 py-14">
      {data === null ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <SpinLoader />
        </div>
      ) : (
        <>
          {data?.id ? (
            <div className=" mx-auto">
              <img
                src={data?.image}
                alt={data?.title}
                className="w-full h-64 md:h-80 lg:h-[600px]  rounded-lg mt-4"
              />
              <h1 className="text-3xl font-semibold mb-8 mt-10">
                {data?.title}
              </h1>
              <div className="flex gap-4 items-center mb-8">
                <img
                  src={data?.user?.profileImg}
                  className="w-14 h-14 rounded-full"
                  alt=""
                />
                <p className="text-sm text-gray-500">
                  {format(new Date(data?.createdAt), "MMMM-dd-yyyy")} <br />
                  <span className="text-slate-800 text-base font-semibold">
                    By {data?.user?.name}
                  </span>
                </p>
              </div>
              <div
                className="prose mt-4"
                dangerouslySetInnerHTML={{ __html: data?.desc }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[400px]">
              <h1 className="text-2xl font-bold text-center py-8 text-gray-900 dark:text-white">
                No blogs found
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleBlogPage;
