import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prevStep,
  nextStep,
  setFormData,
} from "../../redux/features/formReducer";
import { RootState } from "../../redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const StepSeven: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>(data.skills || []);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    dispatch(setFormData({ skills }));
    dispatch(nextStep());
  };

  const addSkill = () => {
    if (skill.trim() !== "") {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#1F284F] max-w-2xl">
          A few Quick Questions, what work are you here to do?
        </h2>
        <p className="max-w-4xl">
          Your skills show mentees what you can offer. Help us by listing your
          skills.
        </p>
      </div>
      <div className="space-y-4 max-w-3xl">
        <Label htmlFor="skill">Skills</Label>
        <div className="flex space-x-2">
          <Input
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Enter a skill"
            className="flex-1"
          />
          <Button onClick={addSkill}>Add Skill</Button>
        </div>
      </div>
      <div className="space-x-3 flex items-center max-w-[360px] flex-wrap ">
        {skills.length > 0 && (
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold">Skills List</h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-40 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
              {skills.map((skill, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <span className="items-center bg-cc py-2 px-4 rounded-lg text-white">
                    {skill}
                  </span>
                  <span>
                    <X
                      size={36}
                      color="red"
                      onClick={() => removeSkill(index)}
                      className="cursor-pointer"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-10">
        <Button variant="outline" className="px-10" onClick={handlePrev}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={skills.length === 0}
          className="px-10 w-fit flex justify-end"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepSeven;
