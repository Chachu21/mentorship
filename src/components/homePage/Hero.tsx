"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-white h-screen dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="container py-5 mx-auto">
        <div className="items-center md:flex">
          <div className="w-full md:w-1/2">
            <div className="md:max-w-md space-y-8">
              <h1 className="text-3xl  font-bold text-[#14A800] dark:text-white md:text-4xl leading-8">
                Unlock personalized guidance and Accelerate your growth.
              </h1>
              <p className="mt-3 text-[18px] font-medium text-gray-800 dark:text-gray-400">
                Experience an unprecedented user journey with our intuitive
                interface.Right here. Right now.
              </p>

              <Link href="/signup">
                <Button className=" flex justify-end items-center w-fit px-5 mt-6 text-md tracking-wider text-white capitalize transition-colors duration-300 transform rounded-md md:w-auto focus:outline-none ">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
          {
            //change the image after finish dashbord
          }
          <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
            <Image src="/assets/hero.jpg" alt="hero" width={700} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
