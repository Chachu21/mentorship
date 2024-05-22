import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setFormData,
  prevStep,
  nextStep,
} from "../../redux/features/formReducer";
import { Card } from "../ui/card";
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

interface EducationType {
  school: string;
  degree: string;
  field: string;
  educationDescription: string;
}

const StepFive: React.FC = () => {
  const dispatch = useDispatch();
  const educations = useSelector(
    (state: RootState) => state.form.data.educations || []
  );

  const [school, setSchool] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [field, setField] = React.useState("");
  const [educationDescription, setDescription] = React.useState("");
  const [hasEducation, setHasEducation] = React.useState(true);
  const [isValid, setIsValid] = React.useState(true); // Default to true to hide validation message initially
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleNext = () => {
    if (
      hasEducation ||
      (school.trim() !== "" && degree.trim() !== "" && field.trim() !== "")
    ) {
      dispatch(nextStep());
    } else {
      setIsValid(false);
    }
  };

  const handleSave = () => {
    if (school.trim() !== "" && degree.trim() !== "" && field.trim() !== "") {
      setIsValid(true);
      const newEducation: EducationType = {
        school,
        degree,
        field,
        educationDescription,
      };
      const updatedEducations: EducationType[] = [...educations, newEducation];
      dispatch(setFormData({ educations: updatedEducations }));
      setHasEducation(true);
      // Reset form fields
      setSchool("");
      setDegree("");
      setField("");
      setDescription("");
      // Close the dialog
      setIsOpen(false);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {educations.map((education: EducationType, index: number) => (
          <Card
            key={index}
            className="w-full py-10 sm:w-[200px] md:w-[350px] cursor-pointer px-3 border-2 border-gray-300"
          >
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">Education</h3>
              <p>School: {education.school}</p>
              <p>Degree: {education.degree}</p>
              <p>Field of Study: {education.field}</p>
              <p>Description: {education.educationDescription}</p>
            </div>
          </Card>
        ))}

        <Card className="w-full py-10 sm:w-[150px] md:w-[250px] cursor-pointer border-2 border-gray-300">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <span className="flex justify-center items-center space-x-3">
                <Plus size={24} className="bg-cc rounded-full text-white" />
                <span> Add Education</span>
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] space-y-3">
              <DialogHeader>
                <DialogTitle className="text-cc">Add Education</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-4">
                  <Label htmlFor="school" className="">
                    School <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Bahir Dar university"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <Label htmlFor="degree" className="">
                    Degree <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="Bachelor of Science"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <Label htmlFor="field" className="">
                    Field of study <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="Software Engineering"
                    className="col-span-3"
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="educationalDescription">Description</Label>
                  <Textarea
                    value={educationDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Type your education description."
                    id="educationalDescription"
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
            id="noEducation"
            checked={!hasEducation}
            onCheckedChange={(checked) => setHasEducation(!checked)}
            disabled={educations.length > 0}
            className="bg-white text-cc border border-cc"
          />
          <Label
            htmlFor="noEducation"
            className="text-sm font-medium leading-none"
          >
            No education to add? Check the box and keep going.
          </Label>
        </div>
        <div className="flex justify-end space-x-10">
          <Button variant="outline" className="px-10" onClick={handlePrev}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={hasEducation && !educations.length}
            className="px-10 w-fit flex justify-end"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
