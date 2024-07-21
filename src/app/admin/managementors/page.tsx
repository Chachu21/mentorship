"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { backend_url } from "@/components/constant";
import SearchUi from "@/components/tables/SearchUi";
import Modal from "@/components/Modal"; // Import your Modal component
import { IUser } from "@/type";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ManageMentor = () => {
  const [mentors, setMentors] = useState<IUser[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<IUser[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"approve" | "delete" | null>(null);
  const userData = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<IUser[]>(
        `${backend_url}/api/v1/users/getallmentors`
      );

      setMentors(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filteredResults = mentors.filter((mentor) =>
      mentor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMentors(filteredResults);
  };

  const openModal = (type: "approve" | "delete", mentorId: string) => {
    setModalType(type);
    setSelectedMentor(mentorId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMentor(null);
  };

  const handleApprove = async () => {
    if (selectedMentor && modalType === "approve") {
      try {
        const token = userData?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        await axios.put(
          `${backend_url}/api/v1/users/mentor/approve/${selectedMentor}`,
          {},
          config
        );

        const updatedMentors = mentors.map((mentor) =>
          mentor._id === selectedMentor
            ? { ...mentor, is_approved: true }
            : mentor
        );
        setMentors(updatedMentors);
        setFilteredMentors(
          filteredMentors.map((mentor) =>
            mentor._id === selectedMentor
              ? { ...mentor, is_approved: true }
              : mentor
          )
        );
        toast.success("Mentor approved successfully");
        closeModal();
      } catch (error) {
        console.error("Error approving mentor:", error);
        toast.error("Failed to approve mentor");
      }
    }
  };

  const handleDelete = async () => {
    if (selectedMentor && modalType === "delete") {
      try {
        const token = userData?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        await axios.delete(
          `${backend_url}/api/v1/users/delete/${selectedMentor}`,
          config
        );

        setMentors(mentors.filter((mentor) => mentor._id !== selectedMentor));
        setFilteredMentors(
          filteredMentors.filter((mentor) => mentor._id !== selectedMentor)
        );
        toast.success("Mentor deleted successfully");
        closeModal();
      } catch (error) {
        console.error("Error deleting mentor:", error);
        toast.error("Failed to delete mentor");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Mentors</h1>
      <div className="my-5">
        <SearchUi handleSearch={handleSearch} search="fullName" />
      </div>

      <div className="flex flex-col mt-4 space-y-4">
        {(filteredMentors.length > 0 ? filteredMentors : mentors).map(
          (mentor) => (
            <Card
              key={mentor._id}
              className="flex flex-col md:flex-row space-x-3"
            >
              <div className="flex flex-col space-y-5 md:flex-1 order-1">
                <Card className="p-8">
                  <CardContent className="flex flex-col space-y-5">
                    <div className="flex sm:flex-row flex-col md:space-y-0 space-y-2 justify-between items-center">
                      <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 space-x-0 md:space-x-2 items-center">
                        {mentor.profileImage && (
                          <Image
                            src={mentor.profileImage.url}
                            alt="Profile"
                            className="object-cover rounded-full"
                            width={120}
                            height={120}
                          />
                        )}

                        <div className="flex flex-col space-y-1">
                          <p className="text-gray-500 text-2xl">
                            {mentor.fullName}
                          </p>
                          <div className="flex items-center space-x-3">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 text-cc"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-500">
                                {mentor.location?.state},{" "}
                                {mentor.location?.region},{" "}
                                {mentor.location?.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="">
                          <Button
                            onClick={() => openModal("delete", mentor._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Reject
                          </Button>
                        </div>
                        <div className="">
                          {!mentor.is_approved && (
                            <Button
                              onClick={() => openModal("approve", mentor._id)}
                            >
                              Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="flex space-x-2">
                        <span className="text-cc md:text-2xl text-xl underline">
                          {mentor.professionalRole}
                        </span>
                      </p>
                    </div>
                    <Separator />
                    <div className="flex flex-col justify-between">
                      <h2 className="text-gray-700 text-xl">Your Bio :</h2>
                      <div className="flex space-x-3">
                        <p className="text-gray-500">{mentor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-8">
                  <CardContent>
                    <h3 className="text-lg font-semibold">Education Details</h3>
                    <div className="flex space-y-3 flex-col ">
                      {mentor.educations?.map((education: any) => (
                        <div key={education.school} className="flex flex-col">
                          <p className="text-gray-600">
                            <strong>School</strong>: {education.school}
                          </p>
                          <p className="text-gray-600">
                            <strong>Degree</strong>:{education.degree}
                          </p>
                          <p className="text-gray-600">
                            <strong>Field</strong>:{education.field}
                          </p>
                          <p>
                            <strong>Education Description</strong>:{" "}
                            {education.educationDescription}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-8">
                  <CardContent>
                    <p className="flex space-x-2 justify-between">
                      <span className="text-lg font-semibold">
                        Work Experience
                      </span>
                    </p>
                    <div>
                      {mentor.experiences && mentor.experiences.length > 0 ? (
                        mentor.experiences.map(
                          (experience: any, index: number) => (
                            <div key={index}>
                              <p>
                                <span className="font-semibold pr-3">
                                  Title :
                                </span>
                                {experience.title}
                              </p>
                              <p>
                                <span className="font-semibold pr-3">
                                  Company :
                                </span>{" "}
                                {experience.company}
                              </p>
                              <p>
                                <span className="font-semibold pr-3">
                                  IsWorking :
                                </span>
                                {experience.isCurrent
                                  ? "currently working"
                                  : "i already stopped working"}
                              </p>
                              <p>
                                <span className="font-semibold pr-3">
                                  Title Description :
                                </span>
                                {experience.experienceDescription}
                              </p>
                            </div>
                          )
                        )
                      ) : (
                        <p>No work experience added.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col space-y-2 order-2 ">
                <Card className="p-8 space-y-5">
                  <p className="flex space-x-2 justify-between">
                    <span className="text-lg font-semibold">Language</span>
                    {/* <Edit className="text-cc" /> */}
                  </p>
                  {mentor.languages && mentor.languages.length > 0 ? (
                    mentor.languages.map((language: string, index: number) => (
                      <p key={index} className="text-gray-500 flex space-x-2">
                        <Check className="text-cc" />
                        <span className="capitalize pr-3">{language}</span> very
                        fleuent
                      </p>
                    ))
                  ) : (
                    <p>No languages added.</p>
                  )}
                </Card>
                <Card className="p-8 space-y-5">
                  <p className="flex space-x-2 justify-between">
                    <span className="text-lg font-semibold">Skills</span>
                  </p>
                  {mentor.skills && mentor.skills.length > 0 ? (
                    mentor.skills.map((skill: string, index: number) => (
                      <div key={index} className="flex space-x-2 ">
                        <Check className="text-cc" />
                        <span className="capitalize"> {skill}</span>
                      </div>
                    ))
                  ) : (
                    <p>No skills added.</p>
                  )}
                </Card>
              </div>
            </Card>
          )
        )}
      </div>

      {/* Render the modal */}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        confirmAction={modalType === "approve" ? handleApprove : handleDelete}
        actionType={modalType || "delete"}
      />
    </div>
  );
};

export default ManageMentor;
