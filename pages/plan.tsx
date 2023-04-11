import React, { useState } from "react";
import Head from "next/head";

import MainLayout from "../src/layout/MainLayout";
import styles from "@/styles/Home.module.css";
import PlanCardDetail from "../src/components/ui/PlanCardDetail";

export default function Plan() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prevCheck) => !prevCheck);
  };

  const plans = [
    {
      type: "Basic",
      name: "Free plan",
      pages: 120,
      mega: 10,
      pdf: 3,
      question: 50,
      users: 1,
      size: 50,
      connector: "0",
    },
    {
      type: "Advanced",
      name: "Ideal for medium-sized businesses",
      pages: 2000,
      mega: 32,
      pdf: 50,
      question: 1000,
      users: 10,
      size: 100,
      connector: "Google drive",
    },
    {
      type: "Ultimate",
      name: "Ideal for large businesses",
      pages: 5000,
      mega: 64,
      pdf: 100,
      question: 2000,
      users: 50,
      size: 500,
      connector: "Google drive, MS365 connectors",
    },
  ];

  return (
    <>
      <Head>
        <title>PDFGPT.IO - Experience PDFs like never before - chat with PDF for quick and easy answers!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MainLayout>
          <div className="w-full h-full md:flex">
            <div className="w-full h-full dark:bg-bgRadialEnd bg-lightText dark:bg-gradient-radial duration-300 transition-all py-10 shadow-lg xl:py-20 overflow-y-scroll">
              <div className="w-full 2xl:mt-0 xl:mt-0 md:mt-8 sm:mt-8 mt-8">
                <p className="text-center text-white text-2xl 2xl:mt-0 xl:mt-0 md:mt-0 sm:mt-12 mt-12 px-4">
                  Lorem Ipsum is simply dummy text of the printing
                </p>
                <div className="flex justify-center items-center my-10">
                  <p className={`mr-6 text-base font-medium ${isChecked ? "text-slate-400" : "dark:text-white"}`}>
                    Monthly
                  </p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <div className="w-12 h-6 p-2 rounded-full dark:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-600 peer-checked:bg-blue-600"></div>
                  </label>
                  <p className={`ml-6 text-base font-medium ${isChecked ? "dark:text-white" : "text-slate-400"}`}>
                    Annual
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 px-10">
                {plans.map((item, index) => (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4">
                    <div className="flex justify-center">
                      <PlanCardDetail
                        type={item.type as "Basic" | "Advanced" | "Ultimate"}
                        name={item.name}
                        pages={item.pages}
                        mega={item.mega}
                        pdf={item.pdf}
                        question={item.question}
                        users={item.users}
                        size={item.size}
                        connector={item.connector}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MainLayout>
      </main>
    </>
  );
}
