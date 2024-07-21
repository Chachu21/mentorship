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
import { toast } from "react-toastify";
import ProposalModal from "../menteeDashboard/proposalModal";
import PaymentModal from "./PaymentModel";
import Pay from "../payment/Pay";
import MentorData from "./MentorData";

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
  const [reviews, setReview] = useState<reviewTypes[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [menteeData, setMenteeData] = useState<IUser | null>(null); // Ensure initial state is null
  const id = user?._id || data?._id;
  const token = data?.token;

  useEffect(() => {
    const fetchMentorshipData = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/mentorship/get/${mentorship_id}`
        );
        setMentorships(res.data);
      } catch (error) {
        toast.error("Failed to fetch mentorship data.");
      }
    };
    if (mentorship_id) {
      fetchMentorshipData();
    }
  }, [mentorship_id]);

  const mentor_id = mentorship?.createdBy;

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/users/get/${id}`);
        setMenteeData(res.data.user);
      } catch (error) {
        toast.error("Failed to fetch user data.");
      }
    };
    if (id) {
      fetchMenteeData();
    }
  }, [id]);

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
    if (mentor_id) {
      fetchUserData();
    }
  }, [mentor_id]);

  const handleApplying = async () => {
    if (
      menteeData?.remainingBalance === undefined ||
      (mentorship && menteeData.remainingBalance < mentorship.amount)
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
    setIsPaymentModalOpen(false);
    setShowModal(true);
  };

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) return;
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  const isTruncated = (text: string | undefined, maxLines: number) => {
    const maxLength = maxLines * 100;
    if (!text) return false;
    return text.length > maxLength;
  };

  const handleOpenProposalModal = () => {
    if (
      menteeData?.remainingBalance === undefined ||
      (mentorship && menteeData.remainingBalance < mentorship.amount)
    ) {
      setIsPaymentModalOpen(true);
      return;
    }
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const fetchReview = async () => {
      const res = await axios.get(
        `${backend_url}/api/v1/comment/get/mentor/${mentor_id}`
      );
      setReview(res.data);
    };
    if (reviews !== null && mentor_id != null) {
      fetchReview();
    }
  }, [mentor_id]);

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
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="flex flex-col md:mt-20 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <MentorData userData={userData} reviews={reviews} />
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
