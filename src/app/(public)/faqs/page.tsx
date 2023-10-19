"use client";

import SpinLoader from "@/components/ui/Loader/SpinLoader";
import { serverURL } from "@/utils/serverUrl";
import axios from "axios";
import { Accordion } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DefaultAccordion() {
  const [faqList, setFaqList] = useState(null);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(serverURL + "/faq/get-public-all")
        .then((res) => {
          setFaqList(res?.data?.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }

    fetchData();
  }, []);
  return (
    <section className="py-14 px-5">
      <h2 className="text-2xl font-bold text-center py-8 text-gray-900 dark:text-white">
        FAQS
      </h2>
      <>
        {faqList === null ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <SpinLoader />
          </div>
        ) : (
          <div className="max-w-[800px] mx-auto">
            <Accordion>
              {faqList?.map((faq: any) => {
                return (
                  <Accordion.Panel key={faq.id}>
                    <Accordion.Title>{faq?.ques}</Accordion.Title>
                    <Accordion.Content>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {faq?.ans}
                      </p>
                    </Accordion.Content>
                  </Accordion.Panel>
                );
              })}
            </Accordion>
          </div>
        )}
      </>
    </section>
  );
}
