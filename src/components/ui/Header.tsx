"use client";

import { clearUser, setUser } from "@/redux/slices/userSlice";
import { getUserInfo, isLoggedIn, logout } from "@/services/auth.services";
import { getLocalStorage } from "@/utils/local-storage";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Avatar } from "flowbite-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { BsCartFill } from "react-icons/bs";
const HeaderSection = () => {
  const [list, setList] = useState<any>([]);
  const userInfo = getUserInfo();
  const isLogIn = isLoggedIn();
  const token: string = getLocalStorage("service-website-token") || "";
  const [reFetch, setReFetch] = useState(false);
  const [profileImg, setProfileImg] = useState<string>("");
  const dispatch = useDispatch();
  // dispatch(setUser(userInfo));

  const user = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await axios.get(serverURL + "/profile/get-info", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (userData?.data?.data) {
        setProfileImg(userData?.data.data?.profileImg);
      } else {
        setProfileImg("");
        toast.error(userData?.data?.message);
      }
    };
    if (isLogIn) {
      fetchData();
    } else {
      setProfileImg("");
    }
  }, [user]);

  useEffect(() => {
    if (!isLogIn) {
      setList([
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Services",
          href: "/services",
        },
        {
          name: "Blog",
          href: "/blog",
        },
        {
          name: "Faqs",
          href: "/faqs",
        },
        {
          name: "Contact",
          href: "/contact",
        },
        {
          name: "Login",
          href: "/login",
        },
      ]);
    } else {
      setList([
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Services",
          href: "/services",
        },
        {
          name: "Blog",
          href: "/blog",
        },
        {
          name: "Faqs",
          href: "/faqs",
        },
        {
          name: "Contact",
          href: "/contact",
        },
        {
          name: "Dashboard",
          href: "/dashboard",
        },
        {
          name: "Logout",
        },
      ]);
    }
  }, [user, reFetch, isLogIn]);

  return (
    <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Service Website
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {list?.map((item: any, index: number) => {
              return (
                <li key={index}>
                  {item.href ? (
                    <Link
                      href={`${item?.href}`}
                      className={`block py-2 pl-3 pr-4 text-black  rounded md:bg-transparent cursor-pointer md:p-0 ${
                        item.name === "Logout" ? "text-red-700" : ""
                      }`}
                      aria-current="page"
                    >
                      {item?.name}
                    </Link>
                  ) : (
                    <p
                      className={`py-2 pl-3 pr-4 text-black flex items-center gap-2  rounded md:bg-transparent md:p-0 cursor-pointer ${
                        item.name === "Logout" ? "text-red-700" : ""
                      }`}
                      aria-current="page"
                      onClick={() => {
                        logout("service-website-token");
                        dispatch(clearUser());
                        setReFetch(!reFetch);
                        toast.success("Logout successfully");
                      }}
                    >
                      <IoMdLogOut /> {item?.name}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center md:order-2 gap-2 pl-3">
          <div
            className="relative top-0 left-0 px-2 cursor-pointer"
            onClick={() => {
              document
                .getElementById("cart-drawer-navigation")
                ?.classList.toggle("hidden");
            }}
          >
            <BsCartFill className="text-slate-800 text-lg" />
            <span className="absolute top-[-10px] right-0 text-green-700 font-bold">
              {cart?.items?.length}
            </span>
          </div>
          <Avatar alt="avatar of Jese" img={profileImg} rounded />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => {
              document
                .getElementById("navbar-sticky")
                ?.classList.toggle("hidden");
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSection;
