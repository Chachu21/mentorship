import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
interface HeroProps {
  title: string;
  subTitle: string;
  buttonText: string;
  image: string;
}
const Hero_Part = ({ title, subTitle, buttonText, image }: HeroProps) => {
  return (
    <section className="bg-white h-full mb-12 dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="md:container py-5 md:mx-auto">
        <div className="items-center md:flex">
          <div className="w-full md:w-1/2">
            <div className="md:max-w-md space-y-8">
              <h1 className="text-3xl  font-bold text-cc dark:text-white md:text-4xl leading-8">
                {title}
              </h1>
              <p className="mt-3 text-[18px] font-medium text-gray-800 dark:text-gray-400">
                {subTitle}
              </p>

              <Link href="/auth">
                <Button className=" flex justify-end items-center w-fit px-5 mt-6 text-md tracking-wider text-white capitalize transition-colors duration-300 transform rounded-md md:w-auto focus:outline-none ">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
            <Image
              src={image}
              alt="hero"
              width={700}
              height={500}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero_Part;
