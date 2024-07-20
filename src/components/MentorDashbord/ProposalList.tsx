"use client";
import { backend_url } from "@/components/constant";
import { Card } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { proposalType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const Proposal = () => {
  const [proposals, setProposals] = useState<proposalType[]>([]);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/proposal/mentor`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setProposals(res.data);
      } catch (error) {
        console.error("Error fetching proposals", error);
      }
    };

    if (token) {
      fetchProposal();
    }
  }, [token]);

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) return;
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  const isTruncated = (text: string, maxLength: number) => {
    return text.length > maxLength;
  };

  const mentoring = async (mentorship_id: string, author: string) => {
    try {
      const resp = await axios.post(
        `${backend_url}/api/v1/contract/create`,
        {
          mentorship_id,
          mentee_id: author,
          isAgree: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      if (resp.status === 201) {
        toast.success("you are accept mentoring");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Your Proposals</h1>
      <Card className="p-3">
        {proposals.length > 0 &&
          proposals.map((proposal) => {
            const combinedText = `${proposal.description}`;
            const isCurrentlyExpanded = expandedMentorId === proposal._id;
            const truncatedText = isCurrentlyExpanded
              ? combinedText
              : `${combinedText.slice(0, 400)} ...`;

            return (
              <div key={proposal._id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold underline text-gray-600 cursor-pointer">
                    {proposal.title}
                  </h3>
                  <Button
                    onClick={() => {
                      mentoring(proposal.mentorship_id, proposal.author);
                    }}
                    className="capitalize"
                  >
                    mentoring
                  </Button>
                </div>
                <p>{truncatedText}</p>
                {isTruncated(combinedText, 400) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(proposal._id);
                    }}
                    className="text-cc underline hover:underline mt-2 flex justify-start items-start"
                  >
                    {isCurrentlyExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            );
          })}
      </Card>
    </div>
  );
};

export default Proposal;
