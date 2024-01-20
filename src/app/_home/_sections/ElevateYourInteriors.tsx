import Link from "next/link"
import React from "react"

export default function ElevateYourInteriors() {
  return (
    <div className="py-14 px-5">
      <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-bold text-[#073842] ">
        Elevate Your <br /> Interiors
      </h2>
      <hr />
      <div className="flex justify-between gap-4 flex-wrap pt-4">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#073842] ">
          Designing Interiors That Leave a Lasting Impression
        </p>
        <Link href="/services">
          <span className="text-2xl font-semibold text-[#073842] underline flex gap-1">
            All Services{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-6 h-6 fill-[#073842] mt-1"
            >
              {" "}
              <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  )
}
