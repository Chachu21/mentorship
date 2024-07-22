import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
interface ListItem {
  id: number;
  title: string;
  subTitle: string;
}

interface InfoSectionProps {
  title: string;
  lists: ListItem[];
  imageSrc: string;
}

const HowItWork = ({ title, lists, imageSrc }: InfoSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="md:container py-5 md:mx-auto md:flex-row flex flex-col md:order-1 order-2 justify-between">
        <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
          <Image
            src={imageSrc}
            alt="hero"
            width={600}
            height={500}
            layout="responsive"
          />
        </div>
        <div className="w-full md:w-1/2 md:order-2 order-1 ">
          <div className=" flex flex-col  md:max-w-md space-y-8 items-center justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
              {title}
            </h2>
            <div>
              {lists.map((list) => (
                <div key={list.id} className="flex flex-col ml-0 md:ml-12">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CheckCircle size={22} color="green" />
                    </div>
                    <h3 className="md:text-xl text-lg  font-semibold text-gray-700">
                      {list.title}
                    </h3>
                  </div>
                  <p className="mt-1 ml-[38px] md:text-lg text-[16px] font-normal text-gray-500 dark:text-gray-400">
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
