import MentorDetailPage from "@/components/ReusedComponent/MentorDetailPage";
import React from "react";

const Page = ({ params }: { params: { mentor_id: string } }) => {
  console.log("mentor id", params.mentor_id);
  return (
    <div>
      <MentorDetailPage mentorship_id={params.mentor_id} />
    </div>
  );
};

export default Page;
