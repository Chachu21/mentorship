"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { backend_url } from "../constant";
import Loading from "../ReusedComponent/Loading";

const CheckProfile = () => {
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.form.data);
  const user = useSelector((state: RootState) => state.users.data);
  const data = useSelector((state: RootState) => state.users.user);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const user_id = data ? data?._id : user?._id;
  const role = data ? data?.role : user?.role;
  const handleSubmit = async () => {
    const id = user?._id ? user?._id : user_id;
    try {
      setSubmit(true);
      const res = await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: {
          level: profile.level,
          profileImage: profile.profileImage,
          bio: profile.bio,
          location: {
            state: profile.state,
            region: profile.region,
            city: profile.city,
            zipCode: profile.zipCode,
          },
          skills: profile.skills,
          languages: profile.languages,
          experiences: profile.experiences,
          educations: profile.educations,
          professionalRole: profile.professionalRole,
          goal: profile.goal,
          service: profile.goal,
          category: profile.category,
          is_account_full_created: true,
        },
      });

      if (res.status === 200) {
        router.push("/auth/login");
      }
    } catch (error) {
      setSubmit(false);
    }
  };

  return (
    <section>
      {isSubmit ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-y-5">
          <h2 className="text-2xl font-semibold text-[#1F284F] max-w-2xl">
            Preview Profile
          </h2>
          <Card className="flex flex-col space-y-5 py-8 px-2 max-w-4xl">
            <CardTitle className="text-xl pl-5">
              <p className="flex sm:flex-row flex-col sm:space-y-0 space-y-2">
                {" "}
                <span>Looking Good</span>
                <span className="text-gray-500 text-2xl pl-4 ">
                  {user.fullName.split(" ")[0]}
                </span>
              </p>
            </CardTitle>
            <div>
              make any edits you want, then submit your profile. you can make
              more changes after live
            </div>
            <CardFooter>
              <Button onClick={handleSubmit}>submit profile</Button>
            </CardFooter>
          </Card>
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3">
            <div className="flex flex-col space-y-5 flex-1 order-1">
              <Card className="py-8 px-2">
                <div className="flex flex-col space-y-5">
                  <div className="flex md:flex-row flex-col space-x-2 items-center">
                    {profile.profileImageUrl && (
                      <Image
                        src={profile.profileImageUrl}
                        alt="Profile"
                        className="object-cover rounded-full"
                        width={120}
                        height={120}
                      />
                    )}

                    <div className="flex flex-col space-y-1">
                      <p className="text-gray-500 text-3xl">{user.fullName}</p>
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
                            {profile.state}, {profile.region}, {profile.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="flex space-x-2">
                      <span className="text-gray-800 text-2xl">
                        {profile.professionalRole}
                      </span>
                      {/* <Edit className="text-cc" /> */}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex flex-col justify-between">
                    <h2 className="text-gray-700 text-xl">Your Bio :</h2>
                    <div className="flex space-x-3">
                      <p className="text-gray-500">{profile.bio}</p>
                      <span>{/* <Edit className="text-cc" /> */}</span>
                    </div>
                    {/* <p>{profile.pricing}</p> */}
                  </div>
                </div>
              </Card>
              <Card className="p-8">
                <div>
                  <h3 className="text-lg font-semibold">Education Details</h3>
                  <div className="flex space-y-3 flex-col ">
                    {profile.educations.map((education: any) => (
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
                </div>
              </Card>
              {role === "mentor" && (
                <Card className="p-8">
                  <div>
                    <p className="flex space-x-2 justify-between">
                      <span className="text-lg font-semibold">
                        Work Experience
                      </span>
                      {/* <Edit className="text-cc" /> */}
                    </p>
                    <div>
                      {profile.experiences && profile.experiences.length > 0 ? (
                        profile.experiences.map(
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
                  </div>
                </Card>
              )}
            </div>
            <div className="flex flex-col space-y-2 order-2">
              <Card className="p-8 space-y-5">
                <p className="flex space-x-2 justify-between">
                  <span className="text-lg font-semibold">Language</span>
                  {/* <Edit className="text-cc" /> */}
                </p>
                {profile.languages && profile.languages.length > 0 ? (
                  profile.languages.map((language: string, index: number) => (
                    <p key={index} className="text-gray-500 flex space-x-2">
                      <Check className="text-cc" />
                      <span className="capitalize pr-3">{language}</span>
                    </p>
                  ))
                ) : (
                  <p>No languages added.</p>
                )}
              </Card>
              <Card className="p-8 space-y-5">
                <p className="flex space-x-2 justify-between">
                  <span className="text-lg font-semibold">Skills</span>
                  {/* <Edit className="text-cc" /> */}
                </p>
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill: string, index: number) => (
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
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckProfile;
