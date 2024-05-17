import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const HowItWork = () => {
  const lists = [
    {
      id: 1,
      title: "No cost to join",
      subTitle:
        "Register and browse professionals, explore projects, or even book a consultation.",
    },
    {
      id: 2,
      title: "Find Your Mentor and Empower Your Journey",
      subTitle:
        "Connect with experienced mentors to guide and support you in your personal and professional growth. Discover top-notch mentorship and elevate your path to success.",
    },
    {
      id: 3,
      title: "Partner with Excellence Affordably",
      subTitle:
        "Access top-tier mentorship without straining your budget. Elevate your growth journey with quality guidance at a reasonable cost",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="md:container py-5 md:mx-auto md:flex-row flex flex-col md:order-1 order-2 justify-between">
        <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
          <Image
            src="/assets/howitwork.jpg"
            alt="hero"
            width={600}
            height={500}
            layout="responsive"
          />
        </div>
        <div className="w-full md:w-1/2 md:order-2 order-1 ">
          <div className=" flex flex-col  md:max-w-md space-y-8 items-center justify-center">
            <h2 className="text-[24px] md:text-[28] font-semibold">
              Up your Mentorship, it’s easy
            </h2>
            <div>
              {lists.map((list) => (
                <div key={list.id} className="flex flex-col ml-0 md:ml-12">
                  <div className="flex items-center space-x-4">
                    <CheckCircle size={22} color="green" />
                    <h3 className="text-[20px] font-semibold">{list.title}</h3>
                  </div>
                  <p className="mt-1 ml-[38px] text-[18px] font-normal text-gray-600 dark:text-gray-400">
                    {list.subTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
