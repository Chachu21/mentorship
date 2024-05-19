import FAQ from "@/components/Mentor/FAQ";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = ({ params }: { params: { mentor_id: string } }) => {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center space-x-3">
            <Image
              src={"/assets/hero.jpg"}
              alt={"profile"}
              width={100}
              height={100}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Mentor Name</h1>
          </div>
          <h3>developer Skill to mentor mentee</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nisi
            animi quisquam itaque quam voluptatem voluptates veniam velit
            maiores voluptatibus? Harum itaque vero obcaecati ratione accusamus
            quod id debitis excepturi.
          </p>
          <div className="py-4 rounded-md text-lg flex space-x-1 text-center  md:container ">
            <span className="p-1 text-center">
              <Star color="yellow" />
            </span>
            <span className="p-1 text-center">
              <Star color="yellow" />
            </span>
            <span className="p-1 text-center">
              <Star color="yellow" />
            </span>
            <span className="p-1 text-center">
              <Star color="yellow" />
            </span>
            <span className="p-1 text-center">
              <Star color="yellow" />
            </span>{" "}
            5 (345)
          </div>
          <div className="flex md:flex-row flex-col space-x-3 space-y-3">
            <div className="">rating details</div>
          </div>
          <div className="flex flex-col space-y-5 py-3">
            <span className="text-green-600 underline">
              review about mentor given by mentee
            </span>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={"/assets/hero.jpg"}
                  alt={"profile"}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-sm ">Mentee Name</h1>
                  <p className="flex space-x-3 items-center">
                    <Star size={18} />
                    <span> 5, may 7, 2024</span>
                  </p>
                </div>
              </div>
              <p>next js</p>
              <p>Good and fast work. Easy communication.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Card className="gray-50 border flex flex-col space-y-3 p-5 ">
            <span>Pricing</span>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center ">
                <p className="flex space-x-3">
                  <input type="radio" /> <span>1_Month</span>
                </p>
                <span>$0</span>
              </div>
              <div className="flex justify-between items-center ">
                <p className="flex space-x-3">
                  <input type="radio" /> <span>3_month</span>
                </p>
                <span>$30</span>
              </div>
              <div className="flex justify-between items-center ">
                <p className="flex space-x-3">
                  <input type="radio" /> <span>6_month</span>
                </p>
                <span>$50</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button className="w-fit px-5 text-lg">apply</Button>
            </div>
          </Card>
          <div>
            <FAQ />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
