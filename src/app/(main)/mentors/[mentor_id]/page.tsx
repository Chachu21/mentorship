"use client";
import FAQ from "@/components/Mentor/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IUser, mentorshipType, reviewTypes } from "@/type";
import axios, { AxiosError } from "axios";
import { CheckCircle, CircleXIcon, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import MentorData from "@/components/ReusedComponent/MentorData";

const MentorDetailPage = ({ params }: { params: { mentor_id: string } }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);
  const [reviews, setReview] = useState<reviewTypes[]>([]);
  const islogin = useSelector((state: RootState) => state.users.isLogin);

  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `${backend_url}/api/v1/users/get/${params.mentor_id}`
      );

      setUserData(res.data.user);
    };
    if (params.mentor_id != null) {
      fetchUserData();
    }
  }, [params.mentor_id]);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios.get(
        `${backend_url}/api/v1/comment/get/mentor/${params.mentor_id}`
      );
      // console.log(res.data);
      setReview(res.data);
    };
    if (reviews !== null && params.mentor_id != null) {
      fetchReview();
    }
  }, [params.mentor_id]);

  //for applying mentoring
  const handleApplying = async () => {
    if (!islogin) {
      router.push("/auth/login");
    } else {
      router.push("/auth/login");
    }
  };

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) {
      return;
    }
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };
  const isTruncated = (text: string | undefined, maxLines: number) => {
    const maxLength = maxLines * 100;
    if (!text) {
      return false;
    }
    return text.length > maxLength;
  };
  const formatDate = (dateInput: Date | undefined) => {
    if (!dateInput) {
      return;
    }
    const date = new Date(dateInput);

    // Check if it's a valid date
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Format date to "Month, Year"
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <MentorData userData={userData} reviews={reviews} />
        <div className="flex flex-col space-y-3">
          {userData?.service === "paid" ? (
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
              <div className="flex justify-end items-center p-4">
                <Button onClick={handleApplying} className="text-lg">
                  Apply For Menoring
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex justify-end items-center p-4">
              <Button onClick={handleApplying} className="text-lg">
                Apply For Menoring
              </Button>
            </div>
          )}
          <div>
            <FAQ />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorDetailPage;
