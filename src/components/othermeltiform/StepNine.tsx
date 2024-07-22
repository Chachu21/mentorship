import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  prevStep,
  nextStep,
  setFormData,
} from "../../redux/features/formReducer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const StepNine: React.FC = () => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    if (bio.length >= 100 && bio.length <= 2000) {
      setIsValid(true);
      dispatch(setFormData({ bio }));
      dispatch(nextStep());
    } else {
      setIsValid(false);
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    if (e.target.value.length >= 100 && e.target.value.length <= 5000) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg md:text-2xl font-semibold text-[#1F284F] max-w-2xl">
          <span className="md:flex hidden">A few Quick Questions,</span> write a
          bio to tell the world about yourself?
        </h2>
        <p className="max-w-4xl">
          Help people get to know you at a glance. What work are you best at?
          Tell them clearly, using paragraphs or bullet points. You can always
          edit later.
        </p>
      </div>
      <div className="flex flex-col space-y-4 max-w-2xl">
        <Label htmlFor="bio" className="">
          Bio <span className="text-red-600">*</span>
        </Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={handleBioChange}
          placeholder="Write your bio here..."
          className="w-full"
        />
        <div className="text-sm text-gray-500">
          {bio.length}/5000 characters
        </div>
        {!isValid && (
          <p className="text-red-600">
            Bio must be between 100 and 2000 characters.
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-10">
        <Button variant="outline" className="px-10" onClick={handlePrev}>
          Back
        </Button>
        <Button onClick={handleNext} className="px-10 w-fit flex justify-end">
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepNine;
