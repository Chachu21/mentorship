import ProposalDetail from "@/components/MentorDashbord/ProposalDetail";
import React from "react";
import { headers } from "next/headers";
const page = ({ params }: { params: { mentee_id: string } }) => {
  // Get the headers object
  const headersList = headers();
  // Get the full URL from the headers
  const fullURL = headersList.get("referer") ?? "";

  // Extract the search params from the URL
  const searchParams = new URL(fullURL).searchParams;
  const mentorshipId = searchParams.get("mentorshipId") || "";

  return (
    <ProposalDetail mentorship_id={mentorshipId} mentee_id={params.mentee_id} />
  );
};

export default page;
