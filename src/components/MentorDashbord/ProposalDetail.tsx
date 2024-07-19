"use client";
import MenteeDetail from "@/components/ReusedComponent/MenteeDetail";
import { Button } from "@/components/ui/button";
import React from "react";
import axios, { AxiosError } from "axios";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface mentee_idProps {
  mentee_id: string;
  mentorship_id: string;
}
const ProposalDetail = ({ mentee_id, mentorship_id }: mentee_idProps) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.users.user);
  const _id = user?._id;
  const token = user?.token;
  const handleBack = () => {
    window.history.back();
  };

  const handleAgreement = async () => {
    try {
      const res = await axios.post(
        `${backend_url}/api/v1/contract/create`,
        {
          isAgree: true,
          mentee_id: mentee_id,
          mentorship_id: mentorship_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        toast.success(res.data.message);
        router.push("/mentordashboard/contracts");
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
  return (
    <section className="flex flex-col space-y-3 py-8">
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="bg-gray-50 text-white px-4 py-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 text-cc"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <Button onClick={handleAgreement}>Mentoring</Button>
      </div>
      <div className="flex-grow">
        <MenteeDetail />
      </div>
    </section>
  );
};

export default ProposalDetail;
