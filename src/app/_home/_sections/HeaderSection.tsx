"use client";

import { Carousel } from "flowbite-react";

export default function HeaderSection() {
  return (
    <Carousel
      className="h-[250px] md:h-[400px] lg:h-[500px] rounded-none"
      slideInterval={5000}
    >
      <div
        style={{
          backgroundImage: `url("https://media.architecturaldigest.com/photos/596fbe4af1daa20469ac12d7/2:1/w_1280%2Cc_limit/neustadt-9.jpg")`,
          backgroundSize: "cover",
        }}
        className="flex h-full text-xl font-bold md:text-2xl lg:text-4xl items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
      >
        <div className="w-full h-full bg-[#00000070] text-white flex justify-center items-center">
          <div className="max-w-[500px] text-center">
            Turning Dreams into Beautiful Spaces
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url("https://media.architecturaldigest.com/photos/596fbe4af1daa20469ac12d7/2:1/w_1280%2Cc_limit/neustadt-9.jpg")`,
          backgroundSize: "cover",
        }}
        className="flex h-full text-xl font-bold md:text-2xl lg:text-4xl items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
      >
        <div className="w-full h-full bg-[#00000070] text-white flex justify-center items-center">
          <div className="max-w-[500px] text-center">
            Elevating Your Lifestyle, One Room at a Time
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url("https://media.architecturaldigest.com/photos/596fbe4af1daa20469ac12d7/2:1/w_1280%2Cc_limit/neustadt-9.jpg")`,
          backgroundSize: "cover",
        }}
        className="flex h-full text-xl font-bold md:text-2xl lg:text-4xl items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
      >
        <div className="w-full h-full bg-[#00000070] text-white flex justify-center items-center">
          <div className="max-w-[500px] text-center">
            Where Style Meets Comfort and Elegance
          </div>
        </div>
      </div>
    </Carousel>
  );
}
