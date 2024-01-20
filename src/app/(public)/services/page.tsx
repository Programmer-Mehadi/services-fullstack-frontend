"use client"

import InputLabel from "@/components/Forms/Labels/InputLabel"
import SpinLoader from "@/components/ui/Loader/SpinLoader"
import ServiceCard from "@/components/ui/ServiceCard"
import { serverURL } from "@/utils/serverUrl"
import axios from "axios"
import { Button, Select, TextInput } from "flowbite-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import toast from "react-hot-toast"

const ServicesHomePage = () => {
  const query = useSearchParams()
  const router = useRouter()
  const [searchdata, setSearchdata] = React.useState({
    name: "",
    location: "",
    category: "",
  })
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
  ]
  const [categoryList, setCategoryList] = React.useState(null)
  const [serviceList, setServiceList] = React.useState(null)

  useEffect(() => {
    axios
      .get(serverURL + "/category/get-all-list")
      .then((res) => {
        setCategoryList(res?.data?.data)
      })
      .catch((err) => {
        setCategoryList([])
      })
  }, [])

  useEffect(() => {
    const name = query.get("name") || ""
    const location = query.get("location") || ""
    const category = query.get("category") || ""
    setSearchdata({
      ...searchdata,
      name: name,
      location: location,
      category: category,
    })
    fetchData(name, location, category)
  }, [query])
  async function fetchData(name: string, location: string, category: string) {
    axios
      .get(
        serverURL +
          `/service/get-public-list?name=${name}&location=${location}&category=${category}`
      )
      .then((res) => {
        setServiceList(res?.data?.data)
      })
      .catch((err) => {
        toast.error("Something went wrong")
      })
  }
  async function searchData() {
    router.push(
      `/services?name=${searchdata.name}&location=${searchdata.location}&category=${searchdata.category}`
    )
    fetchData(searchdata.name, searchdata.location, searchdata.category)
  }

  return (
    <section className="min-h-[90vh] py-14 p-4">
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
              })
            }}
          />
        </div>
        <div className="grid gap-2">
          <InputLabel title="Location" />
          <Select
            value={searchdata.location}
            onChange={(e) =>
              setSearchdata({ ...searchdata, location: e.target.value })
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
              setSearchdata({ ...searchdata, category: e.target.value })
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

      {serviceList === null ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <SpinLoader />
        </div>
      ) : (
        <>
          {serviceList?.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <h1 className="text-2xl text-center font-bold  py-8 text-gray-900 dark:text-white">
                No services found
              </h1>
            </div>
          ) : (
            <>
              {
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                  {serviceList?.map((service: any) => {
                    return (
                      <ServiceCard
                        key={service.id}
                        data={service}
                        customStyle={{}}
                        customClassName="w-full max-w-full h-full min-w-full p-0"
                      />
                    )
                  })}
                </div>
              }
            </>
          )}
        </>
      )}
    </section>
  )
}

export default ServicesHomePage
