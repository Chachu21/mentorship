import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
// import StepEight from "./StepEight";
import StepNine from "./StepNine";
import StepTen from "./StepTen";
import CheckProfile from "./CheckProfile";

const MultiStepForm = () => {
  const currentStep = useSelector((state: RootState) => state.form.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      case 6:
        return <StepSix />;
      case 7:
        return <StepSeven />;
      case 8:
        return <StepNine />;
      // case 9:
      //   return <StepEight />;
      case 9:
        return <StepTen />;
      case 10:
        return <CheckProfile />;
      default:
        return <StepOne />;
    }
  };

  return <div className="container mx-auto p-4 mt-16">{renderStep()}</div>;
};

export default MultiStepForm;
