"use client";
import FAQ from "@/components/Mentor/FAQ";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IUser, mentorshipType } from "@/type";
import axios, { AxiosError } from "axios";
import { CheckCircle, CircleXIcon, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProposalModal from "../menteeDashboard/proposalModal";
import PaymentModal from "./PaymentModel";
import Pay from "../payment/Pay";

interface MentorProps {
  mentorship_id?: string;
}

const MentorDetailPage = ({ mentorship_id }: MentorProps) => {
  const [mentorship, setMentorships] = useState<mentorshipType | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.users.data);
  const data = useSelector((state: RootState) => state.users.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const id = user?._id ? user?._id : data?._id;
  const token = data?.token;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/mentorship/get/${mentorship_id}`
        );
        setMentorships(res.data);
      } catch (error) {
        toast.error("Failed to fetch mentorship data.");
      }
    };
    fetchUserData();
  }, [mentorship_id]);

  const mentor_id = mentorship?.createdBy;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/users/get/${mentor_id}`
        );
        setUserData(res.data.user);
      } catch (error) {
        toast.error("Failed to fetch user data.");
      }
    };
    if (mentor_id != null) {
      fetchUserData();
    }
  }, [mentor_id]);

  const handleApplying = async () => {
    if (
      user.remainingBalance === undefined ||
      (mentorship && user.remainingBalance < mentorship.amount)
    ) {
      setIsPaymentModalOpen(true);
      return;
    }
    try {
      const res = await axios.post(
        `${backend_url}/api/v1/mentorship/apply/${mentorship_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        setIsDialogOpen(false);
        toast.success("Successfully applied for mentorship.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      if (axiosError.response?.status === 400) {
        toast.warning(axiosError.response.data.error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handlePayment = () => {
    // router.push(`/menteedashboard/payment?mentorship_id=${mentorship_id}`);
    setIsPaymentModalOpen(false);
    setShowModal(true);
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

  const handleOpenProposalModal = () => {
    if (
      user.remainingBalance === undefined ||
      (mentorship && user.remainingBalance < mentorship.amount)
    ) {
      setIsPaymentModalOpen(true);
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col space-y-5">
          <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:justify-start justify-center md:items-start items-center space-x-0 md:space-x-4 md:px-4 px-1">
            <div className=" border-2 border-cc rounded-full h-[120px] w-[120px] object-fill">
              <Image
                src={
                  userData ? userData.profileImage.url : "/assets/profile.jpeg"
                }
                alt="profile imag"
                width={120}
                height={120}
                className="rounded-full object-fill"
              />
            </div>
            <div className="ml-3">
              <div className="text-xl flex flex-col space-y-2">
                <h3 className="text-3xl capitalize text-gray-700">
                  {userData?.fullName}
                </h3>

                <p className=" underline capitalize italic text-2xl text-cc">
                  {userData?.professionalRole}
                </p>
                <div className="flex space-x-2 py-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-cc"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    {userData?.location?.state}/{userData?.location?.region}/
                    {userData?.location?.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p
              className={`line-clamp-3 ${
                expandedMentorId === userData?._id ? "line-clamp-none" : ""
              }`}
            >
              {userData?.bio}
            </p>
            {isTruncated(userData?.bio, 3) && (
              <button
                onClick={() => {
                  toggleExpanded(userData?._id);
                }}
                className="text-cc underline hover:underline mt-2"
              >
                {expandedMentorId === userData?._id ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <div className="flex space-x-16 items-center">
            <div>
              <p>
                {userData?.is_approved ? (
                  <span className="flex space-x-3">
                    <CheckCircle className="text-cc" />
                    <span> Verified</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CircleXIcon className="text-gray-500 pr-3" size={28} />
                    not yet Verified
                  </span>
                )}
              </p>
            </div>
          </div>
          <p className="flex space-x-3 pl-4">
            <Star className="text-cc" />
            <Star className="text-cc" />
            <Star className="text-cc" />
            <Star className="text-cc" />
            <Star className="text-cc" />
            <span>
              {userData?.rate} ({325} reviews)
            </span>
          </p>
          <div className="flex flex-col space-y-5 py-3">
            <span className="text-green-600 underline">
              Review about mentor given by mentee
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
                    <span> 5, May 7 , 2024</span>
                  </p>
                </div>
              </div>
              <p>Next.js</p>
              <p>Good and fast work. Easy communication.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          {userData?.service === "paid" ? (
            <Card className="gray-50 border flex flex-col space-y-3 p-5 ">
              <span>Pricing</span>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center ">
                  <p className="flex space-x-3">
                    <input type="radio" /> <span>1 Month</span>
                  </p>
                  <span>$0</span>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="flex space-x-3">
                    <input type="radio" /> <span>3 Months</span>
                  </p>
                  <span>$30</span>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="flex space-x-3">
                    <input type="radio" /> <span>6 Months</span>
                  </p>
                  <span>$50</span>
                </div>
              </div>
              <div className="flex justify-end items-center p-4">
                <Button onClick={handleOpenProposalModal} className="text-lg">
                  Apply For Mentoring
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex justify-end items-center p-4">
              <Button onClick={handleOpenProposalModal} className="text-lg">
                Apply For Mentoring
              </Button>
            </div>
          )}
          <div>
            <FAQ />
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPay={handlePayment}
      />
      <div>
        {mentorship && mentorship._id && (
          <Pay
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            mentorship_id={mentorship._id}
            amount={mentorship.amount}
          />
        )}
      </div>
      <ProposalModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={() => setIsDialogOpen(false)}
        mentorship_id={mentorship_id}
        handleApply={handleApplying}
      />
    </main>
  );
};

export default MentorDetailPage;
