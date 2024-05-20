interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

function Heading({ title, subTitle, center }: HeadingProps) {
  return (
    <div className={`md:mt-5 ${center ? "text-center" : "text-left"}`}>
      <div className="text-2xl md:text-4xl font-bold text-blue-900">
        {title}
      </div>
      <div className="text-md md:text-xl text-slate-500 mt-2">{subTitle}</div>
    </div>
  );
}

export default Heading;
