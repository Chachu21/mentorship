"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { backend_url } from "@/components/constant";
import SearchUi from "@/components/tables/SearchUi";
import Modal from "@/components/Modal"; // Import your Modal component

interface Experience {
  title: string;
  company: string;
  isCurrent: boolean;
  experienceDescription: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  educationDescription: string;
}

interface MentorDataType {
  location: any;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  _id: string;
  city?: string;
  address?: string;
  is_approved: boolean;
  profileImage?: {
    url: string;
  };
  skills?: string[];
  level?: string;
  experiences?: Experience[];
  educations?: Education[];
  professionalRole?: string;
}

const ManageMentor = () => {
  const [mentors, setMentors] = useState<MentorDataType[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<MentorDataType[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"approve" | "delete" | null>(null);
  const userData = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<MentorDataType[]>(
        `${backend_url}/api/v1/users/getallmentors`
      );
      console.log("Data fetched:", response.data);

      const mentors = response.data.map((mentor) => ({
        _id: mentor._id,
        fullName: mentor.fullName,
        email: mentor.email || "N/A",
        phoneNumber: mentor.phoneNumber || "N/A",
        role: mentor.role || "N/A",
        address: mentor.location?.region || "N/A",
        city: mentor.location?.city || "N/A",
        is_approved: mentor.is_approved,
        profileImage: mentor.profileImage,
        skills: mentor.skills || [],
        level: mentor.level || "N/A",
        experiences: mentor.experiences || [],
        educations: mentor.educations || [],
        professionalRole: mentor.professionalRole || "N/A",
      }));

      setMentors(mentors);
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

      <div className="flex flex-col mt-4">
        {(filteredMentors.length > 0 ? filteredMentors : mentors).map(
          (mentor) => (
            <div
              key={mentor._id}
              className="relative bg-white shadow-xl rounded-lg mb-4 p-6 w-full flex items-start"
            >
              <img
                src={mentor.profileImage?.url || "/default-avatar.png"}
                alt={mentor.fullName}
                className="w-24 h-24 rounded-full mr-6"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {mentor.fullName}
                </h2>
                <p className="mb-1">Email: {mentor.email}</p>
                <p className="mb-1">Phone: {mentor.phoneNumber}</p>
                <p className="mb-1">Address: {mentor.address}</p>
                <p className="mb-1">City: {mentor.city}</p>
                <p className="mb-1">
                  Skills:{" "}
                  {mentor.skills.length > 0 ? mentor.skills.join(", ") : "N/A"}
                </p>
                <p className="mb-1">Level: {mentor.level}</p>
                <p className="mb-1">
                  Experience:{" "}
                  {mentor.experiences.length > 0
                    ? mentor.experiences.map((exp, index) => (
                        <div key={index} className="mb-2">
                          <strong>{exp.title}</strong> at {exp.company} (
                          {exp.isCurrent ? "Current" : "Not Current"})
                          <p>{exp.experienceDescription}</p>
                        </div>
                      ))
                    : "N/A"}
                </p>
                <p className="mb-1">
                  Education:{" "}
                  {mentor.educations.length > 0
                    ? mentor.educations.map((edu, index) => (
                        <div key={index} className="mb-2">
                          <strong>{edu.school}</strong> ({edu.field}):{" "}
                          {edu.educationDescription}
                        </div>
                      ))
                    : "N/A"}
                </p>
                <p className="mb-1">
                  Professional Role: {mentor.professionalRole}
                </p>
              </div>
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={() => openModal("delete", mentor._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                {!mentor.is_approved && (
                  <button
                    onClick={() => openModal("approve", mentor._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
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
