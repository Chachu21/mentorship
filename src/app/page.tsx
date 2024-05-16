import ForMentee from "@/components/homePage/ForMentee";
import GroupMentor from "@/components/homePage/GroupMentor";
import Hero from "@/components/homePage/Hero";
import HowItWork from "@/components/homePage/HowItWork";
import Service from "@/components/homePage/Service";
import Cards from "@/components/Mentor/Card";

export default function Home() {
  return (
    <main className="flex flex-col mt-32 space-y-4">
      <Hero />
      <GroupMentor />
      <HowItWork />
      <Cards />
      <ForMentee />
      <Service />
    </main>
  );
}
