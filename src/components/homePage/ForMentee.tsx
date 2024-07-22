import Image from "next/image";
import Link from "next/link";
import React from "react";

const ForMentee = () => {
  return (
    <section className="bg-cc dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="md:container py-5 md:mx-auto">
        <div className="items-center md:flex">
          <div className="w-full md:w-1/2 relative">
            <span className="absolute md:-top-32 -top-10 my-3 md:py-0 left-2  text-white md:text-2xl text-xl">
              for mentee
            </span>
            <div className="md:max-w-md w-full space-y-8 px-2">
              <h1 className="text-2xl  font-bold text-white dark:text-white md:text-3xl leading-8">
                Discover Mentors on Your Terms{" "}
              </h1>
              <p className="mt-3 md:text-lg text-[16px] font-medium text-white dark:text-gray-400">
                Access the broadest network of experienced professionals ready
                to guide you—from immediate support to profound growth journeys.
              </p>
            </div>
          </div>
          {}
          <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
            <Image
              src="/assets/mentee.jpg"
              alt="hero"
              width={668}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForMentee;
