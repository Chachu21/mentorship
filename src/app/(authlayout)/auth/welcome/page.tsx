"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { LucideUsers2, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const router = useRouter();
  const { fullName } = useSelector((state: RootState) => state.users.data);
  const handleClicked = () => {
    router.push("/auth/signup-detail");
  };
  return (
    <section className="flex flex-col space-y-5 mt-16 md:nt-0 h-screen justify-center">
      <div className="text-2xl leading-10">
        Hey <span className="font-semibold">{fullName} </span>👋, <br />
        ready for next step of your profile
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-5 items-center">
        <div className="flex flex-col space-y-4 ">
          <p className="text-gray-500">
            Answer a few question and start bulding your profile
          </p>
          <hr />
          <p className="text-gray-500">
            you can start your mentorship program either in paid or free
          </p>
          <hr />
          <p className="text-gray-500">
            Get paid safely and we are there to help
          </p>
          <hr />
          <Button className="w-fit" onClick={handleClicked}>
            Get Started
          </Button>
        </div>
        <div className="mt-4">
          <Card className="flex flex-col items-center space-y-5 w-full md:w-[500px] p-4">
            <div className="flex object-contain">
              <Image
                src="/assets/hero.jpg"
                alt="profile"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <p className="text-gray-500">ABCD DEF</p>
            <p>Graphics Design / Full stack developer</p>
            <div className="flex space-x-5 items-center">
              <p className="flex space-x-2 items-center">
                <Star className="text-cc" />
                <span> 5.0</span>
              </p>
              <p>
                <span>$100/3month</span>
              </p>
              <p className="flex space-x-2 items-center">
                <LucideUsers2 color="green" />
                <span> 134 mentees</span>
              </p>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, voluptatum aut ex tempora assumenda veniam ad rerum
              voluptatibus cum saepe facere dolore ipsam nihil alias sint
              commodi quia nulla dolor.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
