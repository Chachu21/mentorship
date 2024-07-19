"use client";
import { backend_url } from "@/components/constant";
import { Card } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { proposalType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Proposal = () => {
  const [proposals, setProposals] = useState<proposalType[]>([]);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/proposal/mentee`, {
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
                <h3 className="text-xl font-bold underline text-gray-600 cursor-pointer">
                  {proposal.title}
                </h3>
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
