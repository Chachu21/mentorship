import Button from "./Button";

interface FormViewProps {
  step: number;
  onSubmit: () => void;
  body: React.ReactElement;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
}

function FormView({
  actionLabel,
  body,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  step,
}: FormViewProps) {
  return (
    <div className="rounded-xl md:w-[725px] md:relative ">
      {/* Body */}
      <div className="m-5 md:m-0 md:px-20 bg-transparent md:bg-white h-full">
        <div className="p-5 md:p-1 bg-white md:bg-transparent shadow-lg md:shadow-none rounded-lg h-full">
          {body}
        </div>
      </div>
      {/* Footer */}
      <div className=" w-full md:hidden" />
      {step !== 4 && (
        <div className="md:absolute bottom-0 md:px-20 flex justify-between p-6 md:p-0  w-full">
          {secondaryAction && secondaryActionLabel && (
            <Button
              label={secondaryActionLabel}
              onClick={secondaryAction}
              ghost
            />
          )}
          <Button
            label={actionLabel}
            onClick={onSubmit}
            confirm={actionLabel === "Confirm"}
            className="ml-auto"
          />
        </div>
      )}
    </div>
  );
}

export default FormView;
