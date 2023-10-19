"use client";

import { Card } from "flowbite-react";

export default function PricingSection() {
  return (
    <section className="my-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      <Card>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Standard plan
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">Taka</span>
          <span className="text-5xl font-extrabold tracking-tight">2449</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
        <ul className="my-7 space-y-5">
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              2 team members
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              2-3 room design
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Integration help
            </span>
          </li>
          <li className="flex space-x-3 line-through decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Sketch Files
            </span>
          </li>
          <li className="flex space-x-3 line-through decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Color Access
            </span>
          </li>
          <li className="flex space-x-3 line-through decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Complete overview
            </span>
          </li>
          <li className="flex space-x-3 line-through decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              24×7 phone & email support
            </span>
          </li>
        </ul>
        <button
          className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
          type="button"
        >
          <p>Choose plan</p>
        </button>
      </Card>
      <Card>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Medium plan
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">Taka</span>
          <span className="text-5xl font-extrabold tracking-tight">3249</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
        <ul className="my-7 space-y-5">
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              4 team members
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              4-5 room design
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Integration help
            </span>
          </li>
          <li className="flex space-x-3  decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Sketch Files
            </span>
          </li>
          <li className="flex space-x-3  decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Color Access
            </span>
          </li>
          <li className="flex space-x-3 line-through decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Complete overview
            </span>
          </li>
          <li className="flex space-x-3 line-through decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              24×7 phone & email support
            </span>
          </li>
        </ul>
        <button
          className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
          type="button"
        >
          <p>Choose plan</p>
        </button>
      </Card>
      <Card>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Pro plan
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">Taka</span>
          <span className="text-5xl font-extrabold tracking-tight">4950</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
        <ul className="my-7 space-y-5">
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              8 team members
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              8-10 room design
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Integration help
            </span>
          </li>
          <li className="flex space-x-3  decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Sketch Files
            </span>
          </li>
          <li className="flex space-x-3  decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Color Access
            </span>
          </li>
          <li className="flex space-x-3  decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              Complete overview
            </span>
          </li>
          <li className="flex space-x-3  decoration-gray-500">
            <span className="text-base font-normal leading-tight text-gray-500">
              24×7 phone & email support
            </span>
          </li>
        </ul>
        <button
          className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
          type="button"
        >
          <p>Choose plan</p>
        </button>
      </Card>
    </section>
  );
}
