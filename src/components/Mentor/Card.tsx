"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import axios from "axios";
import { backend_url } from "../constant";
import { IUser } from "@/type";

const Cards = () => {
  const [mentors, setMentors] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/users/get/limit`);
        setMentors(res.data);
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      }
    };

    fetchMentors();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Function to truncate bio text
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) {
      return;
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      {mentors.length >= 2 && (
        <div className="py-32">
          <Slider {...settings}>
            {mentors.map((mentor) => (
              <div key={mentor._id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex flex-col items-center space-y-5 md:w-[600px] w-full p-5">
                    <div className="flex justify-between items-center md:px-4 px-1">
                      <div className="flex flex-col space-y-1">
                        <div className="flex md:flex-row flex-col space-x-3 space-y-2">
                          <Image
                            src={
                              mentor.profileImage?.url || "/default-image.jpg"
                            }
                            alt={mentor.fullName}
                            width={100}
                            height={100}
                            className="rounded-full"
                          />
                          <div className="flex flex-col space-y-2">
                            {" "}
                            <h3 className="text-xl text-cc">
                              {mentor.fullName}
                            </h3>
                            <p className="underline">
                              {mentor.professionalRole}
                            </p>
                            <div className="flex space-x-4">
                              <p className="flex space-x-3">
                                <Star color="yellow" />
                                <span>
                                  {mentor.rate} ({mentor.no_review} review)
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className="text-slate-500 text-xs">
                          {mentor.role}
                        </span>
                      </div>
                    </div>

                    <CardContent className="w-full">
                      <p>{truncateText(mentor.bio, 100)}</p>{" "}
                      {/* Truncate bio to 100 characters */}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Cards;
