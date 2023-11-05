"use client"

import SpinLoader from "@/components/ui/Loader/SpinLoader"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import ServiceDetails from "../../_view/ServiceDetails"
import { Card, Rating } from "flowbite-react"
import { format } from "date-fns"

const SingleServicePage = () => {
  const { id } = useParams()
  const [serviceData, setServiceData] = React.useState(null)
  const [reviewList, setReviewList] = React.useState(null)
  useEffect(() => {
    axios
      .get(serverURL + "/service/get/" + id)
      .then((res) => {
        setServiceData(res?.data?.data)
      })
      .catch((err) => {
        toast.error("Something went wrong")
      })
  }, [id])

  useEffect(() => {
    axios
      .get(serverURL + "/review/get-all-by-service/" + id)
      .then((res) => {
        setReviewList(res?.data?.data)
      })
      .catch((err) => {
        toast.error("Something went wrong")
      })
  }, [id])

  return (
    <section className="min-h-[80vh]">
      {serviceData === null ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <SpinLoader />
        </div>
      ) : (
        <>
          <div className="container mx-auto p-4">
            <ServiceDetails data={serviceData} />
            <div className="my-14">
              <h1 className="text-3xl font-semibold mb-4">Reviews</h1>
              {reviewList === null ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <SpinLoader />
                </div>
              ) : (
                <div className="grid  gap-10">
                  {reviewList?.length === 0 ? (
                    <div className=" flex justify-center items-center min-h-[400px]">
                      <h1 className="text-2xl text-center font-bold  py-8 text-gray-900 dark:text-white">
                        No reviews found
                      </h1>
                    </div>
                  ) : (
                    reviewList?.map((review, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-center items-center"
                        >
                          <div className="card p-4 w-full bg-base-100 border border-t-[0] border-b-[0] border-r-[0]">
                            <div className="card-body flex gap-2">
                              <img
                                src={review?.user?.profileImg}
                                className="w-16 h-16 rounded-full"
                                alt=""
                              />

                              <div>
                                <h2 className="card-title text-lg">
                                  {review?.user?.name}
                                </h2>
                                <p className="text-sm">
                                  {format(
                                    new Date(review?.updatedAt),
                                    "MMM d, yyyy"
                                  )}
                                </p>
                                <div className="flex gap-2 text-base">
                                  {review?.rating}
                                  <Rating>
                                    <Rating.Star />
                                  </Rating>
                                </div>
                                <p className="mt-1">{review?.review}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default SingleServicePage
