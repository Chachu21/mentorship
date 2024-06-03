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
  const userRole = useSelector(
    (state: RootState) => state.users.roleBeforLogin
  ); // Assuming role is stored in state.user.role
  console.log(userRole);
  const renderStep = () => {
    if (userRole === "mentee") {
      switch (currentStep) {
        case 1:
          return <StepThree />;
        case 2:
          return <StepFive />;
        case 3:
          return <StepSix />;
        case 4:
          return <StepSeven />;
        case 5:
          return <StepNine />;
        case 6:
          return <StepTen />;
        case 7:
          return <CheckProfile />;
        default:
          return <StepFive />;
      }
    } else if (userRole === "mentor") {
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
        case 9:
          return <StepTen />;
        case 10:
          return <CheckProfile />;
        default:
          return <StepOne />;
      }
    }
  };

  return <div className="container mx-auto p-4 mt-16">{renderStep()}</div>;
};

export default MultiStepForm;
