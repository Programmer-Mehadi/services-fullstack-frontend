"use client";

import InputLabel from "@/components/Forms/Labels/InputLabel";
import {getLocalStorage} from "@/utils/local-storage";
import {serverURL} from "@/utils/serverUrl";
import axios from "axios";
import {Button, Select, TextInput} from "flowbite-react";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {AiOutlinePlus} from "react-icons/ai";
import ServiceList from "./_sections/ServiceList";
const ServiceHomePage = () => {
  const router = useRouter();
  const query = useSearchParams();
  const [searchdata, setSearchdata] = useState({
    name: "",
    location: "",
    category: "",
  });
  const bangladeshDistricts = [
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barishal",
    "Bhola",
    "Bogra",
    "Brahmanbaria",
    "Chandpur",
    "Chapainawabganj",
    "Chattogram",
    "Chuadanga",
    "Comilla",
    "Cox's Bazar",
    "Dhaka",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gazipur",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jashore (Jessore)",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Madaripur",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Natore",
    "Nawabganj",
    "Netrokona",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Satkhira",
    "Shariatpur",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
    "Thakurgaon",
  ];
  const [categoryList, setCategoryList] = useState(null);
  const [dataList, setDataList] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    axios
      .get(serverURL + "/category/get-all-list")
      .then((res) => {
        setCategoryList(res?.data?.data);
      })
      .catch((err) => {
        setCategoryList([]);
      });
  }, []);

  useEffect(() => {
    const name = query.get("name") || "";
    const location = query.get("location") || "";
    const category = query.get("category") || "";
    setSearchdata({
      ...searchdata,
      name: name,
      location: location,
      category: category,
    });
    fetchData(name, location, category);
  }, [reFetch, query]);

  const fetchData = async (
    name: string,
    location: string,
    category: string
  ) => {
    setDataList(null);
    const token: string = getLocalStorage("service-website-token") || "";
    const dataInfo = await axios.get(
      serverURL +
        `/service/get-all?name=${name}&location=${location}&category=${category}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    if (dataInfo?.data?.data) {
      setDataList(dataInfo.data.data);
    } else {
      toast.error(dataInfo?.data?.message);
    }
  };

  async function searchData() {
    router.push(
      `/dashboard/admin/manage-service?name=${searchdata.name}&location=${searchdata.location}&category=${searchdata.category}`
    );
  }
  return (
    <div
      style={{
        padding: "20px",
        overflowX: "auto",
      }}
    >
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="pb-10 flex flex-wrap gap-3 ">
          <div className="grid gap-2">
            <InputLabel title="Type Name" />
            <TextInput
              placeholder="Search"
              value={searchdata.name}
              onChange={(e) => {
                setSearchdata({
                  ...searchdata,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid gap-2">
            <InputLabel title="Location" />
            <Select
              value={searchdata.location}
              onChange={(e) =>
                setSearchdata({...searchdata, location: e.target.value})
              }
            >
              <option value="">None</option>
              {bangladeshDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-2">
            <InputLabel title="Category" />
            <Select
              value={searchdata.category}
              onChange={(e) =>
                setSearchdata({...searchdata, category: e.target.value})
              }
            >
              <option value="">None</option>
              {categoryList?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-2">
            <InputLabel
              title="Btn Search"
              style={{
                visibility: "hidden",
              }}
            />

            <Button onClick={() => searchData()}>Search</Button>
          </div>
        </div>
        <Link href="/dashboard/admin/manage-service/create">
          <Button className="bg-blue-700" size="sm">
            <AiOutlinePlus className="text-white font-bold text-base mr-3" />
            Add Service
          </Button>
        </Link>
      </div>
      <ServiceList
        dataList={dataList}
        reFetch={reFetch}
        setReFetch={setReFetch}
      />
    </div>
  );
};

export default ServiceHomePage;
