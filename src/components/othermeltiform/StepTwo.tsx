import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setFormData,
  prevStep,
  nextStep,
} from "../../redux/features/formReducer";
import { Edit3, PersonStanding, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const goals = [
  {
    id: 1,
    icon: <Search size={50} />,
    content: "To earn my main income",
    value: "paid",
  },
  {
    id: 2,
    icon: <Edit3 size={50} />,
    content: "To get experience, for provide mentorship",
    value: "free",
  },
  {
    id: 3,
    icon: <PersonStanding size={50} />,
    content: "I don't have a goal in mind yet",
    value: "none",
  },
];

const StepTwo: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);
  const [selectedGoal, setSelectedGoal] = useState<string>(data.goal || "");

  const handlePrev = () => {
    dispatch(prevStep());
  };
  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleSelectGoal = (value: string) => {
    setSelectedGoal(value);
    dispatch(setFormData({ goal: value }));
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#1F284F] max-w-2xl">
          <span className="md:flex hidden">A few quick questions:</span>{" "}
          What&apos;s your biggest goal for mentorship?
        </h2>
        <p className="max-w-4xl">
          Different people come to mentorship for guidance and mentoring. We
          want to highlight the opportunities that fit your goals best while
          still showing you all the possibilities.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {goals.map((goal) => (
          <Card
            className={`w-full py-10 sm:w-[200px] md:w-[300px] cursor-pointer ${
              selectedGoal === goal.value
                ? "border-2 border-cc"
                : "border border-gray-300"
            }`}
            key={goal.id}
            onClick={() => handleSelectGoal(goal.value)}
          >
            <div className="flex flex-col p-4 py-5">
              <span className="text-cc">{goal.icon}</span>
              <p className="mt-4 text-xl">{goal.content}</p>
              <input
                type="radio"
                name="goal"
                value={goal.value}
                checked={selectedGoal === goal.value}
                onChange={() => handleSelectGoal(goal.value)}
                className="hidden"
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-end space-x-10">
        <Button variant={"outline"} className="px-10" onClick={handlePrev}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedGoal}
          className="px-10 w-fit flex justify-end"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
