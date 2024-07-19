"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CircleCheckBig, CircleXIcon } from "lucide-react";
import { backend_url } from "../constant";
import { mentorshipType } from "@/type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ProposalProps {
  mentorship_id?: string;
  isDialogOpen: boolean;
  handleApply: () => void;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const ProposalModal = ({
  mentorship_id,
  isDialogOpen,
  setIsDialogOpen,
}: ProposalProps) => {
  const [mentorship, setMentorship] = useState<mentorshipType | null>(null);
  const [description, setDescription] = useState<string>("");
  const user = useSelector((state: RootState) => state.users.user);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);
  const router = useRouter();
  const token = user?.token;

  useEffect(() => {
    const fetchMentorship = async () => {
      if (mentorship_id) {
        const res = await axios.get(
          `${backend_url}/api/v1/mentorship/get/${mentorship_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          setMentorship(res.data);
        }
      }
    };
    fetchMentorship();
  }, [mentorship_id, token]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const proposal = {
        title: mentorship?.title,
        description,
        mentorship_id: mentorship?._id,
        mentor_id: mentorship?.createdBy,
      };
      const res = await axios.post(
        `${backend_url}/api/v1/proposal/create`,
        proposal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        setDescription("");
        toast.success(res.data.message);
        router.push("/menteedashboard");
      }
    } catch (error) {
      console.error("There was an error creating the mentorship:", error);
    }
  };

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) return;

    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  const isTruncated = (text: string, maxLength: number) => {
    return text.length > maxLength;
  };

  const combinedText = `${mentorship?.description} And the goal  is ${mentorship?.goal}`;
  const isCurrentlyExpanded = expandedMentorId === mentorship?._id;
  const truncatedText = isCurrentlyExpanded
    ? combinedText
    : `${combinedText.slice(0, 400)} ...`;

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      >
        <DialogContent>
          <div className="max-w-6xl flex flex-col space-y-3">
            <div className="hover:bg-gray-100 py-4 cursor-pointer overflow-y-auto">
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-cc font-semibold text-2xl underline italic ">
                    {mentorship?.title}{" "}
                    <span className="text-gray-700">
                      ({mentorship?.duration})
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="">{truncatedText}</p>
                  <div>
                    {isTruncated(combinedText, 400) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(mentorship?._id);
                        }}
                        className="text-cc underline hover:underline mt-2"
                      >
                        {isCurrentlyExpanded ? " Show Less" : " Show More"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3 items-center flex-wrap space-y-3">
                  {mentorship?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-300 px-6 rounded-xl py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  {mentorship?.createdBy !== null && (
                    <>
                      {/* {mentorship?.createdBy?.is_approved ? (
                        <div className="flex space-x-2 items-center">
                          <CircleCheckBig className="text-cc" />
                          <span className="text-cc">account is verified</span>
                        </div>
                      ) : (
                        <div className="flex space-x-2 items-center">
                          <CircleXIcon className="text-cc" />
                          <span className="text-gray-400">
                            account not verifed
                          </span>
                        </div>
                      )} */}
                      <div>
                        <p className="text-gray-600">
                          <strong className="text-cc">Service:</strong>{" "}
                          {mentorship?.service} ({mentorship?.amount} Birr)
                        </p>
                      </div>
                      {/* {mentorship?.createdBy?.location && (
                        <div className="flex space-x-3 items-center">
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

                          <p className="text-gray-500">
                            {mentorship?.createdBy?.location.region},{""}{" "}
                            {mentorship?.createdBy?.location.city}
                          </p>
                        </div>
                      )} */}
                    </>
                  )}
                </div>
              </div>
            </div>

            <DialogTitle>Write your proposal for applying</DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="block text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Apply</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProposalModal;
