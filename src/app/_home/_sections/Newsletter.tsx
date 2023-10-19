"use client";

import { Banner } from "flowbite-react";
import { FaBookOpen } from "react-icons/fa";
import { HiArrowRight, HiX } from "react-icons/hi";

export default function Newsletter() {
  return (
    <section className="p-4">
      <Banner>
        <div className=" py-10 left-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
              Interior Design and Decor Service
            </h2>
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              Our experienced interior designers are here to transform your
              space.
            </p>
            <p className="text-gray-600">
              Follow us on social media for more inspiration:
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center">
            <a
              href="#"
              className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              <FaBookOpen />
              Learn more
            </a>
            <a
              href="#"
              className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Get started
              <HiArrowRight />
            </a>
          </div>
        </div>
      </Banner>
    </section>
  );
}
