"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { ArrowBigRight, Plus, X } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { headers } from "next/headers";
import DetailPageOfMentor from "../Mentor/MentorsList";
import Link from "next/link";

interface Mentorship {
  skill: string;
  description: string;
  goal: string;
  benefit: string;
  fee: string;
  amount: string;
  duration: string;
}

const guidelines = [
  {
    id: 1,
    headers: "Guide tour",
    title: "",
    description:
      "Use your workspace to manage draft job posts, action items, and completed work.",
    footer: "",
    className: "bg-blue-600 text-white text-xl",
  },
  {
    id: 2,
    headers: "Create post ",
    title: "Create mentorship post",
    description: "create a new mentorship post and  get mentees proposal",
    footer: "post new mentorship",
  },
  {
    id: 3,
    headers: "Quik tip",
    title: "Get payment",
    description:
      "once post paid mentorship and the mentees apply for that mentorship and you can get payment from mentee when mentee approve your work",
    footer: "learn more",
  },
];

const Home: React.FC = () => {
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [newMentorship, setNewMentorship] = useState<Mentorship>({
    skill: "",
    description: "",
    goal: "",
    benefit: "",
    fee: "Free",
    amount: "",
    duration: "",
  });

  const handleTogglePosts = () => {
    if (showAll) {
      setVisiblePosts(3);
    } else {
      setVisiblePosts(mentorships.length);
    }
    setShowAll(!showAll);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMentorship({ ...newMentorship, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Calculate platform service fee
    let platformFee = 0;
    if (newMentorship.fee !== "Free") {
      const price = parseFloat(newMentorship.amount);
      platformFee = (price * 5) / 100;
    }

    // Add new mentorship to the list
    setMentorships([...mentorships, newMentorship]);

    // Reset form
    setNewMentorship({
      skill: "",
      description: "",
      goal: "",
      benefit: "",
      fee: "Free",
      amount: "",
      duration: "",
    });
    setIsDialogOpen(false);
  };

  return (
    <section className="flex flex-col space-y-3">
      <div className="flex justify-end items-center">
        <Button className="space-x-3" onClick={() => setIsDialogOpen(true)}>
          <Plus size={24} />
          <span className="text-xl">Post a Mentorship Offer</span>
        </Button>
      </div>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold capitalize">Your Mentorship Posts</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentorships.slice(0, visiblePosts).map((mentorship, index) => (
          <Card
            key={index}
            className="w-full md:max-w-[340px] lg:max-w-[400px] px-5 py-5"
          >
            <h2 className="text-xl font-semibold">{mentorship.skill}</h2>
            <p className="text-gray-600">{mentorship.description}</p>
            <p>
              <strong>Goal:</strong> {mentorship.goal}
            </p>
            <p>
              <strong>Benefit:</strong> {mentorship.benefit}
            </p>
            <p>
              <strong>Service Fee:</strong> {mentorship.fee}
            </p>
            {mentorship.fee !== "Free" && (
              <p>
                <strong>Amount:</strong> {mentorship.amount}
              </p>
            )}
            <p>
              <strong>Duration:</strong> {mentorship.duration}
            </p>
          </Card>
        ))}
      </div>
      {mentorships.length > 3 && (
        <div className="flex ">
          <Button onClick={handleTogglePosts} className="mt-4">
            {showAll ? "See Less" : "See More"}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {guidelines.map((guideline) => (
          <Card
            key={guideline.id}
            className={`w-full md:max-w-[340px] lg:max-w-[400px] relative px-5 py-5 space-y-3 h-[350px] ${
              guideline.className ? guideline.className : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="">{guideline.headers}</p>
              <X className="cursor-pointer" size={28} />
            </div>
            <h2 className="text-2xl font-semibold pt-10">{guideline.title}</h2>
            <p className={`${guideline.className ? "" : "text-gray-500"} `}>
              {guideline.description}
            </p>
            {guideline.footer && (
              <Button
                variant={"outline"}
                className="absolute bottom-1 text-cc text-center cursor-pointer text-xl"
              >
                {guideline.footer}
              </Button>
            )}
          </Card>
        ))}
      </div>
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="opacity-30" />
        <DialogContent>
          <DialogTitle>Add New Mentorship</DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium">Skill</Label>
                <Input
                  type="text"
                  name="skill"
                  value={newMentorship.skill}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Description</Label>
                <Textarea
                  name="description"
                  value={newMentorship.description}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Goal</Label>
                <Input
                  type="text"
                  name="goal"
                  value={newMentorship.goal}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Benefit</Label>
                <Input
                  type="text"
                  name="benefit"
                  value={newMentorship.benefit}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">Service Fee</Label>
                <div className="flex space-x-8">
                  <Label className="flex items-center">
                    <input
                      type="radio"
                      name="fee"
                      value="Free"
                      checked={newMentorship.fee === "Free"}
                      onChange={handleChange}
                      className="mr-1 h-5 w-5 input-radio"
                    />
                    Free
                  </Label>
                  <Label className="flex items-center">
                    <input
                      type="radio"
                      name="fee"
                      value="Paid"
                      checked={newMentorship.fee === "Paid"}
                      onChange={handleChange}
                      className="h-5 w-5 mr-1 input-radio"
                    />
                    Paid
                  </Label>
                </div>
              </div>
              {newMentorship.fee === "Paid" && (
                <div>
                  <Label className="block text-sm font-medium">Amount</Label>
                  <Input
                    type="text"
                    name="amount"
                    value={newMentorship.amount}
                    onChange={handleChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
              )}
              <div>
                <Label className="block text-sm font-medium">Duration</Label>
                <Input
                  type="text"
                  name="duration"
                  value={newMentorship.duration}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Mentorship</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Home;
