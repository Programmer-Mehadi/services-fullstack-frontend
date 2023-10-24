"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import React, {useEffect} from "react";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";

const LatestBlog = () => {
  const [blogPosts, setBlogPosts] = React.useState(null);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(serverURL + "/blog/latest-blog")
        .then((res) => {
          setBlogPosts(res?.data?.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }

    fetchData();
  }, []);
  return (
    <>
      {blogPosts === null ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <SpinLoader />
        </div>
      ) : (
        <>
          {blogPosts?.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <h1 className="text-2xl font-bold text-center py-8 text-gray-900 dark:text-white">
                No blogs found
              </h1>
            </div>
          ) : (
            <section>
              <h2 className="text-3xl font-bold text-center py-14">
                Latest Blogs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 pb-8">
                {blogPosts?.map((post: any, index: number) => (
                  <BlogCard key={index} {...post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default LatestBlog;
