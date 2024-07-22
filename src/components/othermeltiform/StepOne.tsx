import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { setFormData, nextStep } from "../../redux/features/formReducer";
import { Edit3, PersonStanding, Search } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

const levels = [
  {
    id: 1,
    icon: <Search size={50} />,
    content: "I am brand new to this",
    value: "new",
  },
  {
    id: 2,
    icon: <Edit3 size={50} />,
    content: "I have some experience",
    value: "some experience",
  },
  {
    id: 3,
    icon: <PersonStanding size={50} />,
    content: "I am an expert ",
    value: "expert",
  },
];

const StepOne = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.data);
  const [selectedlevel, setSelectedlevel] = useState<string>(data.level || "");

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleSelectlevel = (value: string) => {
    setSelectedlevel(value);
    dispatch(setFormData({ level: value }));
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg md:text-2xl font-semibold text-[#1F284F] max-w-2xl">
          A few Quick Question: Have you been mentor before?
        </h2>
        <p className="max-w-4xl">
          this lets know how much help to give you along the way. we won&apos;t
          share your answer with anyone else, including potential mentees
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {levels.map((level) => (
          <Card
            className={`w-full py-10 sm:w-[200px] md:w-[300px] cursor-pointer ${
              selectedlevel === level.value
                ? "border-2 border-cc"
                : "border border-gray-300"
            }`}
            key={level.id}
            onClick={() => handleSelectlevel(level.value)}
          >
            <div className="flex flex-col p-4 py-5">
              <span className="text-cc">{level.icon}</span>
              <p className="mt-4 text-xl">{level.content}</p>
              <input
                type="radio"
                name="level"
                value={level.value}
                checked={selectedlevel === level.value}
                onChange={() => handleSelectlevel(level.value)}
                className="hidden"
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-end items-end">
        <Button
          onClick={handleNext}
          disabled={!selectedlevel}
          className="px-10 w-fit flex justify-end"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
