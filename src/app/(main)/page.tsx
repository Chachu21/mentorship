import FeedbackForm from "@/components/homePage/FeedbackForm";
import ForMentee from "@/components/homePage/ForMentee";
import GroupMentor from "@/components/homePage/GroupMentor";
import Hero from "@/components/homePage/Hero";
import HowItWorks from "@/components/homePage/HowItWork";
import Service from "@/components/homePage/Service";
import Cards from "@/components/Mentor/Card";

export default function Home() {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-3">
      <Hero />
      <GroupMentor />
      <HowItWorks />
      <Cards />
      <ForMentee />
      <Service />
      <FeedbackForm />
    </main>
  );
}
