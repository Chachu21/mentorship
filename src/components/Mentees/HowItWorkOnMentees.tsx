import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const HowItWorkOnMentees = () => {
  const lists = [
    {
      id: 1,
      title: "Find Suitable Mentors",
      subTitle:
        "Search for mentors based on their expertise, availability, and reviews from other mentees. You can find both free and paid options.",
    },
    {
      id: 2,
      title: "Schedule Your Mentorship Session",
      subTitle:
        "Choose a time that works for you and request a mentorship session. If immediate availability is not possible, schedule a consultation for a future time.",
    },
    {
      id: 3,
      title: "Engage in 1-on-1 or Group Mentorship",
      subTitle:
        "Connect with your mentor through Zoom or other platforms. Receive personalized advice, discuss challenges, and work on strategies to achieve your goals.",
    },
    {
      id: 4,
      title: "Plan Future Steps with Mentor's Guidance",
      subTitle:
        "After your session, decide on the next steps. You can renew your mentorship agreement or explore additional mentors for further support.",
    },
  ];


  return (
    <section className="bg-white dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="md:container py-5 md:mx-auto md:flex-row flex flex-col md:order-1 order-2 justify-between">
        <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
          <Image
            src="data:image/jpeg;base64,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"
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

export default HowItWorkOnMentees;
