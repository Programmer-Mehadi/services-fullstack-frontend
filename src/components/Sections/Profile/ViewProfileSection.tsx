import React from "react";

import Link from "next/link";
import { Card, Dropdown } from "flowbite-react";
import { AiFillEdit } from "react-icons/ai";
import { Avatar } from "flowbite-react";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
const ViewProfileSection = ({ userData = null }: { userData: any }) => {
  return (
    <>
      {userData ? (
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <div className="flex justify-end px-4 pt-4">
              {userData?.role === "super_admin" && (
                <Link href="/dashboard/super-admin/profile/edit">
                  <AiFillEdit className="cursor-pointer text-2xl text-blue-700" />
                </Link>
              )}
              {userData?.role === "admin" && (
                <Link href="/dashboard/admin/profile/edit">
                  <AiFillEdit className="cursor-pointer text-2xl text-blue-700" />
                </Link>
              )}
              {userData?.role === "user" && (
                <Link href="/dashboard/user/profile/edit">
                  <AiFillEdit className="cursor-pointer text-2xl text-blue-700" />
                </Link>
              )}
            </div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-full max-w-[100px] h-[100px] rounded-full"
                src={userData?.profileImg}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {userData?.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userData?.role}
              </span>
              <hr />
            </div>

            <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
              More Details
            </h5>

            <ul className="my-4 space-y-3">
              <li>
                <p className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                  <span className="ml-3 flex-1 whitespace-nowrap">Email</span>
                  <span className="ml-3 flex-1 whitespace-nowrap font-[500]">
                    {userData?.email}
                  </span>
                </p>
              </li>
              <li>
                <p className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Contact No
                  </span>
                  <span className="ml-3 flex-1 whitespace-nowrap font-[500]">
                    {userData?.contactNo}
                  </span>
                </p>
              </li>
              <li>
                <p className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                  <span className="ml-3 flex-1 whitespace-nowrap">Address</span>
                  <span className="ml-3 flex-1 whitespace-nowrap font-[500]">
                    {userData?.address}
                  </span>
                </p>
              </li>
            </ul>
            <div>
              <a
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                href="#"
              >
                <p>
                  I am a {userData?.role === "super_admin" && "Super Admin"}{" "}
                  {userData?.role === "admin" && "Admin"}{" "}
                  {userData?.role === "user" && "User"}
                </p>
              </a>
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <SpinLoader />
        </div>
      )}
    </>
  );
};

export default ViewProfileSection;
