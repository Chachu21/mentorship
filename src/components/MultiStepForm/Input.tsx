import { ChangeEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  type?: string;
  label: string;
  id: string;
  accept?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  accept,
  type,
  errors,
  id,
  label,
  register,
  required,
  placeholder,
  onChange, // Include onChange in props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className={`font-semibold text-sm md:text-[15px] ${
            errors[id] ? "text-rose-400" : "text-blue-950"
          }`}
        >
          {label}
        </label>
        {errors[id] && (
          <div className="text-rose-500 font-bold text-sm">
            This field is required!
          </div>
        )}
      </div>
      <input
        type={type}
        {...register(id, { required })}
        id={id}
        accept={accept}
        placeholder={placeholder}
        onChange={onChange} // Pass onChange to the input element
        className={`border-[1px] border-neutral-300 rounded-md outline-none py-2 px-3 md:py-3 md:px-4 focus:border-blue-900 md:text-xl placeholder:text-neutral-400
        ${
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-blue-900"
        }`}
      />
    </div>
  );
}

export default Input;
