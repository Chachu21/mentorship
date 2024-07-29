"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/redux/store";
import { IUser } from "@/type";
import axios from "axios";
import { Check, Edit2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { backend_url } from "@/components/constant";

const Profile = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    isCurrent: false,
    experienceDescription: "",
  });
  const [editSection, setEditSection] = useState<string | null>(null); // State to control which section to edit
  const user = useSelector((state: RootState) => state.users.data);
  const data = useSelector((state: RootState) => state.users.user);
  const user_id = data?._id;
  const id = user?._id ? user?._id : user_id;

  const date = new Date();
  const time = date.toLocaleTimeString(); // Format time as hh:mm:ss

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`${backend_url}/api/v1/users/get/${id}`);
      setUserData(res.data.user);
    };
    fetchUserData();
  }, [id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setProfileImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = async () => {
    try {
      const res = await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: { ...userData, profileImage },
      });
      if (res.status === 200) {
        // console.log(res.data.user);
        setUserData(res.data.user);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const handleEditClick = (section: string) => {
    setEditSection(section);
    if (userData) {
      switch (section) {
        case "role":
          setUserData({
            ...userData,
            professionalRole: userData.professionalRole,
          });
          break;
        case "bio":
          setUserData({
            ...userData,
            bio: userData.bio,
          });
          break;
        case "experiences":
          setUserData({
            ...userData,
            experiences: userData.experiences,
          });
          break;
        case "skills":
          setUserData({
            ...userData,
            skills: userData.skills,
          });
          break;
        case "education":
          setUserData({
            ...userData,
            educations: userData.educations,
          });
          break;
        case "languages":
          setUserData({
            ...userData,
            languages: userData.languages,
          });
          break;
        default:
          setUserData({ ...userData });
          break;
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUserData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewExperience((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleAddExperience = async () => {
    try {
      const updatedExperiences = [
        ...(userData?.experiences || []),
        newExperience,
      ];
      const res = await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: { ...userData, experiences: updatedExperiences },
      });
      if (res.status === 200) {
        setUserData(res.data.user);
        setNewExperience({
          title: "",
          company: "",
          isCurrent: false,
          experienceDescription: "",
        });
        setEditSection(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding new experience:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: userData,
      });
      if (res.status === 200) {
        setUserData(res.data.user);
        setEditSection(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <main className="md:flex-row flex flex-col space-x-5 pt-3">
      <div className="flex flex-col md:flex-grow order-1">
        <Card className="space-y-8 py-5 ">
          <CardContent className="space-y-8">
            <div className="flex sm:flex-row flex-col md:space-x-3 items-center px-4 py-12 border border-gray-300">
              <div>
                <div className="relative">
                  <div className="">
                    {userData?.profileImage.url && (
                      <Image
                        src={userData.profileImage.url}
                        alt="Profile"
                        className="object-cover rounded-full cursor-pointer"
                        width={120}
                        height={120}
                        onClick={() =>
                          document.getElementById("profileImageInput")?.click()
                        }
                      />
                    )}
                  </div>
                  <div className="absolute top-0 z-30 left-0 bg-green-500 rounded-full w-6 h-6 border-2 border-white" />
                  <input
                    type="file"
                    accept="image/*"
                    id="profileImageInput"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 flex justify-center items-center cursor-pointer"
                    onClick={() =>
                      document.getElementById("profileImageInput")?.click()
                    }
                  >
                    <span className="text-white text-xs">Edit</span>
                  </div>
                </div>
                {profileImage && (
                  <Button onClick={handleProfileImageUpload} className="mt-4">
                    Upload
                  </Button>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-500 text-2xl font-bold">
                  {userData?.fullName}
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
                      {userData?.location?.state}, {userData?.location?.region},
                      {userData?.location?.city} , ({time})
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 space-y-8 p-4">
              <div className="flex items-center space-x-6">
                <h2 className="text-gray-700 text-xl">
                  {userData?.professionalRole}
                </h2>
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                    onClick={() => handleEditClick("role")}
                  >
                    <Edit2 />
                  </div>
                </div>
              </div>
              <Separator className="my-12" />
              <div className="flex space-x-6">
                <div>
                  <p>{userData?.bio}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                    onClick={() => handleEditClick("bio")}
                  >
                    <Edit2 />
                  </div>
                </div>
              </div>
              <Separator className="my-12" />
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="flex space-x-2 justify-between">
                    Work Experience
                  </h2>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                        onClick={() => handleEditClick("experiences")}
                      >
                        <Plus />
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <div
                        className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                        onClick={() => handleEditClick("experiences")}
                      >
                        <Edit2 />
                      </div>
                    </div> */}
                  </div>
                </div>

                <div>
                  {userData?.experiences ? (
                    userData?.experiences.map(
                      (experience: any, index: number) => (
                        <div key={index}>
                          <p>
                            <span className="font-semibold pr-3">Title :</span>
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
              </div>
              <Separator className="my-12" />
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Education Details</h3>
                  <div className="flex items-center space-x-2">
                    <div
                      className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                      onClick={() => handleEditClick("education")}
                    >
                      <Edit2 />
                    </div>
                  </div>
                </div>
                <div className="flex space-y-3 flex-col items-start justify-start">
                  {userData?.educations &&
                    userData?.educations.map((education: any) => (
                      <CardContent
                        key={education.school}
                        className="flex flex-col"
                      >
                        <p className="text-gray-800">
                          <strong>School:</strong> {education.school}
                        </p>
                        <p className="text-gray-800">
                          <strong>Degree:</strong>
                          {education.degree}
                        </p>
                        <p className="text-gray-800">
                          <strong>Field:</strong>
                          {education.field}
                        </p>
                        <p className="text-gray-800">
                          <strong>Education Description:</strong>{" "}
                          {education.educationDescription}
                        </p>
                      </CardContent>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="order-2 ">
        <Card className="px-4 py-8">
          <CardContent>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="flex space-x-2 justify-between">Skills</h2>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                      onClick={() => handleEditClick("skills")}
                    >
                      <Plus />
                    </div>
                  </div>
                </div>
              </div>
              {userData?.skills && userData.skills.length > 0 ? (
                userData.skills.map((skill: string, index: number) => (
                  <div key={index} className="flex space-x-2 ">
                    <Check className="text-cc" />
                    <span className="capitalize"> {skill}</span>
                  </div>
                ))
              ) : (
                <p>No skills added.</p>
              )}
            </div>
            <Separator className="my-12" />
            <div>
              <div className="flex justify-between items-center">
                <h2 className="flex space-x-2 justify-between">Languages</h2>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="rounded-full p-2 text-cc cursor-pointer border border-gray-400"
                      onClick={() => handleEditClick("languages")}
                    >
                      <Plus />
                    </div>
                  </div>
                </div>
              </div>
              {userData?.languages && userData.languages.length > 0 ? (
                userData.languages.map((language: string, index: number) => (
                  <p key={index} className="text-gray-500 flex space-x-2">
                    <Check className="text-cc" />
                    <span className="capitalize pr-3">{language}</span> very
                    fleuent
                  </p>
                ))
              ) : (
                <p>No languages added.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Dialog for editing sections */}
      <Dialog open={!!editSection} onOpenChange={() => setEditSection(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editSection}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {editSection === "role" && (
              <div className="space-y-2">
                <Label htmlFor="professionalRole">Professional Role</Label>
                <Input
                  id="professionalRole"
                  value={userData?.professionalRole || ""}
                  onChange={handleChange}
                />
              </div>
            )}
            {editSection === "bio" && (
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={userData?.bio || ""}
                  onChange={handleChange}
                />
              </div>
            )}
            {editSection === "experiences" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newExperience.title}
                    onChange={handleExperienceChange}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newExperience.company}
                    onChange={handleExperienceChange}
                  />
                </div>
                <div>
                  <Label htmlFor="experienceDescription">
                    Experience Description
                  </Label>
                  <Textarea
                    id="experienceDescription"
                    value={newExperience.experienceDescription}
                    onChange={handleExperienceChange}
                  />
                </div>
              </div>
            )}
            {editSection === "skills" && (
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" value={""} onChange={handleChange} />
              </div>
            )}
            {editSection === "education" && (
              <div className="space-y-2">
                {userData?.educations?.map((education: any, index: number) => (
                  <div key={index}>
                    <Label htmlFor="school">School</Label>
                    <Input
                      id="school"
                      value={education.school || ""}
                      onChange={handleChange}
                    />
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={education.degree || ""}
                      onChange={handleChange}
                    />
                    <Label htmlFor="field">Field of study</Label>
                    <Input
                      id="field"
                      value={education.field || ""}
                      onChange={handleChange}
                    />
                    <Label htmlFor="educationDescription">
                      Education Description
                    </Label>
                    <Textarea
                      id="educationDescription"
                      value={education.educationDescription || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                {/* <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  value={userData?.school || ""}
                  onChange={handleChange}
                />
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={userData?.degree || ""}
                  onChange={handleChange}
                />
                <Label htmlFor="field">Field of study</Label>
                <Input
                  id="field"
                  value={userData?.field || ""}
                  onChange={handleChange}
                /> */}
              </div>
            )}
            {editSection === "languages" && (
              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <Input id="languages" value={""} onChange={handleChange} />
              </div>
            )}
            <DialogFooter className="my-5">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Profile;
