import React from "react";
import DetailPageOfMentor from "../Mentor/MentorsList";
import Link from "next/link";

const OtherMentors = () => {
  return (
    <div>
      <div className="w-full py-20 flex flex-col space-y-5">
        <div className="flex md:flex-row flex-col space-y-1 space-x-3">
          <h2 className="text-2xl font-semibold">
            Other mentor or Experts for Helping you in your skill
          </h2>
          <Link href={"#"} className="text-cc text-2xl hover:underline">
            Browse Exprets
          </Link>
        </div>
        <DetailPageOfMentor url={`menteedashboard`} />
      </div>
    </div>
  );
};

export default OtherMentors;
