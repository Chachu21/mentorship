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

  const toggleExpanded = (mentorId: string | null) => {
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  const isTruncated = (text: string, maxLength: number) => {
    return text.length > maxLength;
  };

  const mentoring = async (
    mentorship_id: string,
    author: string,
    id: string
  ) => {
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
      // console.log(resp.data);
      if (resp.status === 201) {
        toast.success("You have accepted the mentoring request");
        updateProposal(id, "accepted");
        window.location.reload;
      }
    } catch (error) {
      console.error("Error accepting mentoring", error);
    }
  };

  const updateProposal = async (id: string, status: string) => {
    try {
      await axios.put(
        `${backend_url}/api/v1/proposal/update/${id}`,
        {
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
      toast.success(`proposal is successfully ${status}`);
    } catch (error) {
      console.error("Error updating proposal", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <h1>Your Proposals</h1>
      <Card className="p-3">
        {proposals.length > 0 ? (
          proposals
            .filter((proposal) => proposal.status !== "rejected") // Filter out rejected proposals
            .map((proposal) => {
              const combinedText = `${proposal.description}`;
              const isCurrentlyExpanded = expandedMentorId === proposal._id;
              const truncatedText = isCurrentlyExpanded
                ? combinedText
                : `${combinedText.slice(0, 400)}`;

              return (
                <Card key={proposal._id} className="p-3 mb-8">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold underline text-gray-600 cursor-pointer">
                        {proposal.title}
                      </h3>
                      {proposal.status === "accepted" ? (
                        <button
                          className="bg-gray-300 px-4 py-2 rounded text-gray-700"
                          disabled
                        >
                          Proposal is accepted
                        </button>
                      ) : proposal.status === "pending" ? (
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => {
                              mentoring(
                                proposal.mentorship_id,
                                proposal.author,
                                proposal._id
                              );
                            }}
                            className="capitalize"
                          >
                            Mentor
                          </Button>
                          <Button
                            onClick={() => {
                              updateProposal(proposal._id, "rejected");
                            }}
                            className="capitalize bg-red-400"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : null}
                    </div>
                    <p>{truncatedText}</p>
                    {isTruncated(combinedText, 400) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(proposal._id);
                        }}
                        className="text-cc underline hover:underline mt-2"
                      >
                        {isCurrentlyExpanded ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </Card>
              );
            })
        ) : (
          <p>No proposals found</p>
        )}
      </Card>
    </div>
  );
};

export default Proposal;
