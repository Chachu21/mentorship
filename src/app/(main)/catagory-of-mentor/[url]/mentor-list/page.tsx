"use client";
import DetailPageOfMentor from "@/components/Mentor/MentorsList";
import { backend_url } from "@/components/constant";
import { IUser } from "@/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface MentorsPageProps {
  params: {
    mentor_id: string;
  };
}

const Mentors_Page: React.FC<MentorsPageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [mentors, setMentors] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        if (filter) {
          const res = await axios.get(
            `${backend_url}/api/v1/users/mentors/skill`,
            {
              params: {
                skill: filter,
              },
            }
          );
          setMentors(res.data);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, [filter]);

  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      {/* Pass mentors and pathname to DetailPageOfMentor component */}
      <DetailPageOfMentor url={`mentors`} mentors={mentors} />
    </main>
  );
};

export default Mentors_Page;
