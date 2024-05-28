import { Link } from "lucide-react";
import React from "react";
import DetailPageOfMentor from "../Mentor/MentorsList";

const OtherMentors = () => {
  return (
    <div>
      <div className="w-full py-20 flex flex-col space-y-5">
        <div className="flex space-x-3">
          <h2 className="text-2xl font-semibold">
            Other mentor or Experts for Helping you in your skill
          </h2>
          <Link href={"/mentor/all"} className="text-cc text-2xl">
            Browse Exprets
          </Link>
        </div>
        <DetailPageOfMentor />
      </div>
    </div>
  );
};

export default OtherMentors;
