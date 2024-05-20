import SidebarItem from "./SidebarrItem";

interface SidebarProps {
  currentStep: number;
}

const STEPS = ["YOUR INFO", "ADDRESS", "BANK INFO", "SUMMARY"];

const Sidebar = ({ currentStep }: SidebarProps) => {
  return (
    <div className="w-full h-24 md:min-w-[275px] md:w-[315px] md:h-[650px] bg-white flex md:flex-col gap-4 md:gap-8 justify-center md:justify-start mt-0 md:mt-8 md:my-0 md:px-8 md:py-10">
      {STEPS.map((step, index) => (
        <SidebarItem
          key={index}
          isCurrent={index === currentStep}
          step={index + 1}
          title={step}
        />
      ))}
    </div>
  );
};

export default Sidebar;
