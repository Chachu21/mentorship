import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { RootState } from "../../redux/store";
import {
  setFormData,
  prevStep,
  nextStep,
} from "../../redux/features/formReducer";

const categories = [
  "Development & IT",
  "Design & Creativity Art",
  "Health & Fitness",
  "Lifestyle",
  "Social & Business",
  "Marketing & Finances",
  // Add more categories as needed
];

const StepThree = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);
  const user = useSelector((state: RootState) => state.users.user);
  const userrole = useSelector(
    (state: RootState) => state.users.roleBeforLogin
  );
  const role = user ? user?.role : userrole;
  const [professionalRole, setProfessionalRole] = useState<string>(
    data.professionalRole || ""
  );
  const [category, setCategory] = useState<string>(data.category || "");

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    if (professionalRole.trim() && category) {
      dispatch(setFormData({ professionalRole, category }));
      dispatch(nextStep());
    }
  };

  return (
    <div className="flex flex-col space-y-4 ">
      <div className="space-y-3">
        <h2 className="text-lg md:text-2xl font-semibold text-[#1F284F] max-w-2xl">
          <span className="hidden md:flex">A few quick questions:</span> How
          would you like to tell us about yourself?
        </h2>
        <p className="max-w-4xl text-[16px] font-normal text-gray-600">
          We need to get a sense of your education, experience, and skills.
          It&apos;s quickest to improve your information. you can edit it before
          your profile goes live.
        </p>
      </div>
      <div>
        <div className="text-xl text-cc">fill the following form</div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg">
            Now, add a title to tell the world what you do.
          </h2>
          <p className="text-sm font-light">
            it&apos;s the nice thing{" "}
            {role === "mentor" ? "mentees" : "mentees and mentors"} see, make it
            count, stand out by describing your expertise in your own words.
          </p>
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-5">
        <Label htmlFor="professionalrole">Your Professional Role</Label>
        <Input
          type="text"
          id="professionalrole"
          value={professionalRole}
          onChange={(e) => setProfessionalRole(e.target.value)}
          placeholder="Software Engineer / finance management / construction"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-5">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-200 outline-none"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-10">
        <Button variant={"outline"} className="px-10" onClick={handlePrev}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!professionalRole.trim() || !category}
          className="px-10 w-fit flex justify-end"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
