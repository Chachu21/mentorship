"use client";
import {
  DollarSign,
  Filter,
  MessageCircleDashed,
  Search,
  TimerIcon,
} from "lucide-react";
import React from "react";

const Service = () => {
  const services = [
    {
      id: 1,
      title: "chat/messaging",
      icon: <MessageCircleDashed size={50} />,
      description:
        "Mentors and mentees can engage in real-time text-based chats within the platform.",
    },
    {
      id: 2,
      title: "searching",
      icon: <Search size={50} />,
      description:
        "Users can enter keywords related to their interests or needs to find relevant mentors or mentees.",
    },
    {
      id: 3,
      title: "matching",
      icon: <Filter size={50} />,
      description:
        "Our platform uses advanced algorithms to match mentors with mentees based on their interests, skills, and goals.",
    },
    {
      id: 4,
      title: "scheduling",
      icon: <TimerIcon size={50} />,
      description:
        "Users can schedule mentorship sessions at convenient times directly through the platform.",
    },
    {
      id: 5,
      title: "Payment",
      icon: <DollarSign size={50} />,
      description:
        "If the mentor provide service paid, he/she get paid of service based on the agreement they made with the mentee",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className=" md:container  px-0 md:px-6 py-10 md:mx-auto">
        <h1 className="text-xl font-semibold text-center text-gray-800 capitalize lg:text-[28px] dark:text-white">
          explore our <br /> awesome{" "}
          <span className="text-blue-500">Services</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800"
            >
              <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                {service.icon}
              </span>

              <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                {service.title}
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
                {service.description}
              </p>
{/* 
              <a
                href="#"
                className="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
              >
                <span className="mx-1">read more</span>
                <svg
                  className="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
