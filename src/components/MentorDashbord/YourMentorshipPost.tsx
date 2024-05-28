import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { mentorshipType } from "@/type";
import { Card } from "../ui/card";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const YourMentorshipPost = () => {
  const [mentorships, setMentorships] = useState<mentorshipType[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(3);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.users.user);
  const id = user?._id;
  const token = user?.token;

  // Fetch mentors' posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/mentorship/getbymentor/${id}`
      );
      setMentorships(res.data);
    };
    fetchPosts();
  }, [id]);

  const handleTogglePosts = () => {
    setVisiblePosts(showAll ? 3 : mentorships.length);
    setShowAll(!showAll);
  };

  const handleDeletePosts = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/mentorship/delete/${deletePostId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
            "Content-Type": "application/json",
          },
        }
      );
      setMentorships(
        mentorships.filter((mentorship) => mentorship._id !== deletePostId)
      );
      setDeletePostId(null); // Reset deletePostId after deletion
      setIsDialogOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <section className="flex flex-col space-y-3">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold capitalize">Your Mentorship Posts</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentorships.slice(0, visiblePosts).map((mentorship, index) => (
          <Card
            key={index}
            className="w-full md:max-w-[340px] lg:max-w-[400px] px-5 py-5"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{mentorship.skill}</h2>
              <button
                className="hover:text-red-700"
                onClick={() => {
                  setIsDialogOpen(true);
                  setDeletePostId(mentorship._id || null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-600">
              <strong>Description</strong>
              <p className="line-clamp-3">{mentorship.description}</p>
            </div>
            <div className="text-gray-600">
              <strong>Goal:</strong>{" "}
              <p className="line-clamp-3">{mentorship.goal}</p>
            </div>
            <div className="text-gray-600">
              <strong>Benefit:</strong>{" "}
              <p className="line-clamp-3">{mentorship.benefit}</p>
            </div>
            <p className="text-gray-600">
              <strong>Service:</strong> {mentorship.service}
            </p>
            {mentorship.service !== "Free" && (
              <p className="text-gray-600">
                <strong>Amount:</strong> {mentorship.amount}
              </p>
            )}
            <p className="text-gray-600">
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

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-10 justify-center items-center my-8">
            <Button
              onClick={handleDeletePosts}
              className="mr-2 bg-red-600 hover:bg-red-400 text-white px-4"
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="px-4">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default YourMentorshipPost;
