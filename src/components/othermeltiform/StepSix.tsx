import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  prevStep,
  nextStep,
  setFormData,
} from "../../redux/features/formReducer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";

const StepSix: React.FC = () => {
  const dispatch = useDispatch();
  const languages = useSelector(
    (state: RootState) => state.form.data.languages || [] // Ensure it's an array
  );

  const [language, setLanguage] = useState("");
  const [languageList, setLanguageList] = useState(languages);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    if (languageList.length > 0) {
      dispatch(setFormData({ languages: languageList }));
      dispatch(nextStep());
    }
  };

  const handleAddLanguage = () => {
    if (language.trim() !== "") {
      setLanguageList([...languageList, language.trim()]);
      setLanguage("");
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const newList = languageList.filter(
      (_lang: string, i: number) => i !== index
    );
    setLanguageList(newList);
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="space-y-3">
        <h2 className="text-lg md:text-2xl font-semibold text-[#1F284F] max-w-2xl">
          <span className="md:flex hidden">A few Quick Questions,</span> tell us
          which languages you speak?
        </h2>
        <p className="max-w-4xl">
          Mentorship is Ethiopian-based, so the Amharic language is a must. Do
          you speak other languages?
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col space-y-4">
            <Label htmlFor="title" className="">
              Language <span className="text-red-600">*</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter a language"
                className="flex-1"
              />
              <Button onClick={handleAddLanguage}>Add Language</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-40 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
          {languageList.map((lang: string, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="bg-cc py-2 px-4 rounded-lg text-white">
                {lang}
              </span>
              <X
                color="red"
                size={36}
                className="cursor-pointer"
                onClick={() => handleRemoveLanguage(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-10">
        <Button variant="outline" onClick={handlePrev}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={languageList.length === 0}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
