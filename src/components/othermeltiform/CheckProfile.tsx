"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Check, Edit, LocateIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

const CheckProfile = () => {
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.form.data);

  const handleSubmit = () => {
    //Todo
    //  await axios.put(
    //       `http://localhost:5000/api/v1/users/update/${id}`,
    //       profile
    //     );
    router.push("/dashboard");
  };

  return (
    <section className="flex flex-col space-y-5">
      <h2 className="text-2xl font-semibold text-[#1F284F] max-w-2xl">
        Preview Profile
      </h2>
      <Card className="flex flex-col space-y-5 p-8 max-w-4xl">
        <CardTitle className="text-xl pl-5">Looking Good Abebe</CardTitle>
        <CardContent>
          make any edits you want, then submit your profile. you can make more
          changes after live
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>submit profile</Button>
        </CardFooter>
      </Card>
      <div className="flex flex-col md:flex-row space-x-3">
        <div className="flex flex-col space-y-5 flex-1 order-1">
          <Card className="p-8">
            <CardContent className="flex flex-col space-y-5">
              <div className="flex space-x-2 items-center">
                {profile.profileImageUrl && (
                  <Image
                    src={profile.profileImageUrl}
                    alt="Profile"
                    className="object-cover rounded-full"
                    width={128}
                    height={128}
                  />
                )}

                <div className="flex flex-col space-y-1">
                  <p className="text-gray-500">{profile.name || "ABCD DEF"}</p>
                  <p className="flex items-center">
                    <LocateIcon />{" "}
                    {profile.state &&
                      profile.city &&
                      ` / ${profile.state}, ${profile.city}`}
                  </p>
                </div>
              </div>
              <div>
                <p className="flex space-x-2">
                  <span className="text-gray-800">
                    Graphics Design / Full stack developer
                  </span>
                  <Edit className="text-cc" />
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex space-x-3">
                  <p className="text-gray-500">{profile.bio}</p>
                  <span>
                    <Edit className="text-cc" />
                  </span>
                </div>
                <p>{profile.pricing}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardContent>
              <p className="flex space-x-2 justify-between">
                <span>Education detail</span>
                <Edit className="text-cc" />
              </p>
              <div>
                <div>
                  {profile.educations.map((education: any) => (
                    <div key={education.school}>
                      <p>School: {education.school}</p>
                      <p>Degree:{education.degree}</p>
                      <p>Field:{education.field}</p>
                      <p>Description:{education.educationDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardContent>
              <p className="flex space-x-2 justify-between">
                <span>Work Experience</span>
                <Edit className="text-cc" />
              </p>
              <div>
                {profile.experience && profile.experience.length > 0 ? (
                  profile.experience.map((experience: any, index: number) => (
                    <p key={index}>
                      {experience.title}
                      {experience.company}
                      {experience.isworking}
                      {experience.description}
                    </p>
                  ))
                ) : (
                  <p>No work experience added.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col space-y-2 order-2">
          <Card className="p-8 space-y-5">
            <p className="flex space-x-2 justify-between">
              <span>Language</span>
              <Edit className="text-cc" />
            </p>
            {profile.languages && profile.languages.length > 0 ? (
              profile.languages.map((language: string, index: number) => (
                <p key={index} className="text-gray-500 flex space-x-2">
                  <Check className="text-cc" />
                  <span className="capitalize">{language}</span> very fleuent
                </p>
              ))
            ) : (
              <p>No languages added.</p>
            )}
          </Card>
          <Card className="p-8 space-y-5">
            <p className="flex space-x-2 justify-between">
              <span>Skills</span>
              <Edit className="text-cc" />
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
    </section>
  );
};

export default CheckProfile;
