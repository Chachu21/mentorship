"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your card components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

const Cards = () => {
  const mentors = [
    {
      id: 1,
      name: "Mentor 1",
      rating: 4.5,
      review_cont: 329,
      role: "Mentor",
      service: "free",
      skill: "Next js/ react/js/ts/node js/sql/postgress",
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description:
        "Guidance and mentorship  services about: • Web Development • WordPress Development • DNS (how to configure your domain name) • Hosting service and servers configuration Let us discuss your project and get started!",
    },
    {
      id: 2,
      name: "Mentor 2",
      role: "Mentor",
      review_cont: 439,
      rating: 4.5,
      service: "paid",
      skill: "AI/machine learing",
      image: "/assets/hero.jpg",
      description:
        "Access the broadest network of experienced professionals ready to guide you—from immediate support to profound growth journeys.",
    },
    {
      id: 3,
      name: "Mentor 3",
      role: "Mentor",
      review_cont: 439,
      rating: 4.5,
      service: "paid",
      skill: "Business consult",
      image: "/assets/hero.jpg",
      description:
        "Access the broadest network of experienced professionals ready to guide you—from immediate support to profound growth journeys.",
    },
  ];

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

  return (
    <div className="py-32">
      <Slider {...settings}>
        {mentors.map((mentor) => (
          <div key={mentor.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="flex flex-col items-center space-y-5  md:w-[600px] w-[400px] h-[340px] p-5">
                <div className="flex justify-between items-center md:px-4 px-1">
                  <div className="flex flex-col space-y-1">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <span className="text-slate-500 text-xs">
                      {mentor.role}
                    </span>
                  </div>
                  <div className="ml-3">
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {mentor.skill}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <p>
                    service:{" "}
                    <span className="text-[#14A800]">{mentor.service}</span>
                  </p>
                  <p className="flex space-x-3">
                    <Star color="yellow" />
                    <span>
                      {mentor.rating} ({mentor.review_cont} review)
                    </span>
                  </p>
                </div>
                <CardContent>
                  <p>{mentor.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Cards;
