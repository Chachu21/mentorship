interface SidebarItemProps {
  isCurrent: boolean;
  title: string;
  step: number;
}

function SidebarItem({ isCurrent, title, step }: SidebarItemProps) {
  return (
    <div
      className={`flex gap-5 ${
        isCurrent ? "text-[#14A800]" : "text-gray-600 "
      } items-center`}
    >
      <div
        className={`rounded-full border border-white text-sm font-semibold w-8 h-8 flex justify-center items-center mb-6 md:mb-0 md:w-10 md:h-10 md:text-lg ${
          isCurrent ? "bg-[#14A800] text-white border-none" : "bg-transparent"
        }`}
      >
        {step}
      </div>
      <div className="hidden md:block -space-y-1">
        <div className="font-light text-neutral-600 text-sm">STEP {step}</div>
        <div className="font-semibold tracking-widest">{title}</div>
      </div>
    </div>
  );
}

export default SidebarItem;
