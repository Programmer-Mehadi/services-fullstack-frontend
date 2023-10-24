"use client";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {Card} from "flowbite-react";
import {useEffect, useState} from "react";

const SurvaySections = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(serverURL + "/survay/get-all")
      .then((res) => {
        console.log(res);
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-5 mb-10">Survay</h2>
      {data === null ? (
        <div className="min-h-[100px] flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1300px] mx-auto pb-10 px-5">
          <Card>
            <p className="text-2xl font-medium text-center text-cyan-500">
              {data?.result?._avg?.price.toFixed(2)}
            </p>
            <h2 className="text-3xl font-bold text-center">
              Average Service Price
            </h2>
          </Card>
          <Card>
            <p className="text-2xl font-medium text-center text-cyan-500">
              {data?.result?._count?.id}
            </p>
            <h2 className="text-3xl font-bold text-center">Total Service</h2>
          </Card>
          <Card>
            <p className="text-2xl font-medium text-center text-cyan-500">
              {data?.result2?._count?.id}
            </p>
            <h2 className="text-3xl font-bold text-center">Total Booking</h2>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SurvaySections;
