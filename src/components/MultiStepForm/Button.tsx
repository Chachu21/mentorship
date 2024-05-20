interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ghost?: boolean;
  confirm?: boolean;
  className?: string;
}

function Button({ label, onClick, ghost, className, confirm }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold px-4 py-2 rounded-md md:px-6 md:py-3 
      ${
        ghost
          ? "bg-transparent text-neutral-400 hover:text-[#4EBD3F] "
          : confirm
          ? "bg-[#14A800] hover:bg-[#4EBD3F] text-white"
          : "bg-[#14A800] hover:bg-[#4EBD3F] text-white"
      } 
      
       ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
