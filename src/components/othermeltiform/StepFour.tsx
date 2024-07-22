import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setFormData,
  prevStep,
  nextStep,
} from "../../redux/features/formReducer";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface experienceType {
  title: string;
  company: string;
  isCurrent: boolean;
  experienceDescription: string;
  hasExperience: boolean;
}

const StepFour: React.FC = () => {
  const dispatch = useDispatch();
  const experiences = useSelector(
    (state: RootState) => state.form.data.experiences || []
  );

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [experienceDescription, setDescription] = useState("");
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [hasExperience, setHasExperience] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleSave = () => {
    if (title.trim() !== "" && company.trim() !== "") {
      setHasExperience(true);
      setIsValid(true);
      setIsOpen(false);

      const newExperience: experienceType = {
        title,
        company,
        isCurrent,
        experienceDescription,
        hasExperience,
      };
      const updatedExperiences: experienceType[] = [
        ...experiences,
        newExperience,
      ];
      dispatch(setFormData({ experiences: updatedExperiences }));

      // Reset form fields
      setTitle("");
      setCompany("");
      setDescription("");
      setIsCurrent(false);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {experiences.map((experience: experienceType, index: number) => (
          <Card
            key={index}
            className="w-full py-10 sm:w-[200px] md:w-[350px] cursor-pointer px-1 border-2 border-gray-300"
          >
            <CardContent className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <p className="text-gray-600">Title: {experience.title}</p>
              <p className="text-gray-600">Company: {experience.company}</p>
              <p className="text-gray-600">
                {experience.isCurrent
                  ? "Currently Working"
                  : "Not Currently Working"}
              </p>
              <p className="w-full md:max-w-[350] text-gray-600 flex-wrap">
                Description: {experience.experienceDescription}
              </p>
            </CardContent>
          </Card>
        ))}

        <Card className="w-full py-10 sm:w-[150px] md:w-[250px] cursor-pointer border-2 border-gray-300">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <span className="flex justify-center items-center space-x-3">
                <Plus size={24} className="bg-cc rounded-full text-white" />
                <span> Add Experience</span>
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] space-y-3">
              <DialogHeader>
                <DialogTitle className="text-cc">
                  Add Work Experience
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-4">
                  <Label htmlFor="title" className="">
                    Title <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write your title at the company"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <Label htmlFor="company" className="">
                    Company <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="@Google etc"
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="isCurrent"
                    checked={isCurrent}
                    onCheckedChange={(checked) => setIsCurrent(!!checked)}
                    className="bg-white text-cc"
                  />
                  <Label htmlFor="isCurrent" className="ml-2">
                    I am currently working in this role.
                  </Label>
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="experiancedescription">Description</Label>
                  <Textarea
                    placeholder="Type your title description."
                    id="experiancedescription"
                    value={experienceDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {!isValid && (
                  <p className="text-red-600">
                    Please fill out the required fields.
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleSave}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
      <div className="flex flex-col justify-end space-y-8">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="noExperience"
            checked={!hasExperience}
            disabled={experiences.length > 0}
            onCheckedChange={(checked) => setHasExperience(!checked)}
            className="bg-white text-cc border border-cc"
          />
          <Label
            htmlFor="noExperience"
            className="text-sm font-medium leading-none"
          >
            No experience to add? Check the box and keep going.
          </Label>
        </div>
        <div className="flex justify-end space-x-10">
          <Button variant="outline" className="px-10" onClick={handlePrev}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={hasExperience && !experiences.length}
            className="px-10 w-fit flex justify-end"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
