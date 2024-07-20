"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { mentorshipType } from "@/type";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Plus } from "lucide-react";
import { backend_url } from "../constant";

const MentoringPost = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [newMentorship, setNewMentorship] = useState<mentorshipType>({
    skills: [],
    description: "",
    goal: "",
    service: "Free",
    amount: 0,
    duration: "",
    title: "",
  });
  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;

  const handleSkillChange = (value: string) => {
    const skillArray = value.split(",").map((skill) => skill.trim());
    setNewMentorship({ ...newMentorship, skills: skillArray });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field being changed is the skill field
    if (name === "skills") {
      handleSkillChange(value);
    } else {
      setNewMentorship({ ...newMentorship, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Calculate platform service fee
    let platformFee = 0;
    let YourPayment = 0;
    if (newMentorship.service !== "Free") {
      const price = newMentorship.amount;
      platformFee = (price * 5) / 100;
      YourPayment = newMentorship.amount - platformFee;
    }

    // Include platform fee in the mentorship data
    const mentorshipData = {
      ...newMentorship,
      YourPayment,
    };

    try {
      // Sending request to server
      //   console.log(mentorshipData);
      const res = await axios.post(
        `${backend_url}/api/v1/mentorship/create`,
        mentorshipData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
            "Content-Type": "application/json",
          },
        }
      );
      // Add new mentorship to the list
      if (res.status === 201) {
        // Reset form
        setNewMentorship({
          skills: [],
          description: "",
          goal: "",
          service: "Free",
          amount: 0,
          duration: "",
          title: "",
        });
        setIsDialogOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("There was an error creating the mentorship:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-end items-center">
        <Button className="space-x-3" onClick={() => setIsDialogOpen(true)}>
          <Plus size={24} />
          <span className="text-xl">Post a Mentoring Offer</span>
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* <DialogOverlay className="opacity-30" /> */}
        <DialogContent>
          <DialogTitle>Add New Mentorship</DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="block text-sm font-medium">
                  Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={newMentorship.title}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills" className="block text-sm font-medium">
                  Skill
                </Label>
                <Input
                  type="text"
                  name="skills"
                  value={newMentorship.skills}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="block text-sm font-medium">Description</Label>
                <Textarea
                  name="description"
                  value={newMentorship.description}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="block text-sm font-medium">Goal</Label>
                <Textarea
                  name="goal"
                  value={newMentorship.goal}
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
                      name="service"
                      value="Free"
                      checked={newMentorship.service === "Free"}
                      onChange={handleChange}
                      className="mr-1 h-5 w-5 input-radio"
                    />
                    Free
                  </Label>
                  <Label className="flex items-center">
                    <input
                      type="radio"
                      name="service"
                      value="Paid"
                      checked={newMentorship.service === "Paid"}
                      onChange={handleChange}
                      className="h-5 w-5 mr-1 input-radio"
                    />
                    Paid
                  </Label>
                </div>
              </div>
              {newMentorship.service === "Paid" && (
                <div>
                  <Label className="block text-sm font-medium">Amount</Label>
                  <Input
                    type="number"
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
    </div>
  );
};

export default MentoringPost;
