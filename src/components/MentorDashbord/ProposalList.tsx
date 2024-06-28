"use client";
import React, { useEffect, useState } from "react";
import Proposal from "../ReusedComponent/Proposal";
import { backend_url } from "../constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { mentorshipType } from "@/type";

// Define a type to represent the mentee and mentorship ID pair
type MenteeMentorshipPair = {
  menteeId: string;
  mentorshipId: string;
};

const ProposalList = () => {
  const [menteeMentorshipPairs, setMenteeMentorshipPairs] = useState<
    MenteeMentorshipPair[]
  >([]);
  const user = useSelector((state: RootState) => state.users.user);
  const data = useSelector((state: RootState) => state.users.data);

  const id = user ? user?._id : data?._id;

  // Fetch mentors' posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/mentorship/getbymentor/${id}`
        );

        // Map the response to get mentee IDs along with their mentorship IDs
        const pairs = res.data.flatMap((mentorship: mentorshipType) =>
          mentorship.mentees?.map((menteeId: string) => ({
            menteeId,
            mentorshipId: mentorship._id,
          }))
        );

        setMenteeMentorshipPairs(pairs);
        console.log("pair of mentee is and mentorshio id", pairs);
      } catch (error) {
        console.error("Failed to fetch mentorships:", error);
      }
    };

    if (id) {
      fetchPosts();
    }
  }, [id]);

  return (
    <section className="flex flex-col space-y-4">
      <h1>Proposal List</h1>
      {menteeMentorshipPairs.map(({ menteeId, mentorshipId }) => (
        <section key={menteeId}>
          <Proposal mentee_id={menteeId} mentorshipId={mentorshipId} />
        </section>
      ))}
    </section>
  );
};

export default ProposalList;
