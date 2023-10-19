"use client";

import React, { useEffect } from "react";
import BlogCard from "./_sections/BlogCard";
import axios from "axios";
import { serverURL } from "@/utils/serverUrl";
import toast from "react-hot-toast";
import SpinLoader from "@/components/ui/Loader/SpinLoader";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = React.useState(null);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(serverURL + "/blog/get-public-list")
        .then((res) => {
          setBlogPosts(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-14">
              {blogPosts?.map((post: any, index: number) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogPage;
