"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";

const EmailVerificationTemplate: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<HTMLInputElement[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    // If the value is not a digit and not empty, return
    if (!/^[0-9]$/.test(value) && value !== "") return;

    // Update the OTP value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if value is a digit
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move focus to the previous input if backspace is pressed and the field is empty
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (validateOtp(otpValue)) {
      router.push("/auth/welcome");
    }
  };

  const validateOtp = (input: string) => {
    const otpPattern = /^[0-9]{6}$/;
    if (!input.match(otpPattern)) {
      setError("Invalid OTP. Please enter a 6-digit number.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">
        <div className="h-[200px] bg-[#14A800] w-full text-white flex items-center justify-center flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <EmailIcon />
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
              THANKS FOR SIGNING UP!
            </div>
            <div className="text-xl sm:text-3xl tracking-wider font-bold capitalize">
              Verify your E-mail Address
            </div>
          </div>
        </div>
        <main className="mt-8 px-5 sm:px-10">
          <h2 className="text-gray-700">Hello John Deo,</h2>
          <p className="mt-2 leading-loose text-gray-600">
            Please use the following One Time Password(OTP)
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex items-center mt-4 gap-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el!)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-10 h-10 text-2xl font-medium text-[#14A800] border border-[#14A800] rounded-md text-center"
                  maxLength={1}
                />
              ))}
            </div>
            {error && <p className="mt-2 text-red-600">{error}</p>}
            <button
              type="submit"
              className="px-6 py-2 mt-6 text-sm font-bold tracking-wider text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80"
            >
              Verify email
            </button>
          </form>
          <p className="mt-4 leading-loose text-gray-600">
            This passcode will only be valid for the next
            <span className="font-bold"> 2 minutes</span>. If the passcode does
            not work, you can use this login verification link:
          </p>
          <p className="mt-8 text-gray-600">
            Thank you, <br />
            Mentrship plc Team
          </p>
        </main>
        <p className="text-gray-500 px-5 sm:px-10 mt-8">
          This email was sent from{" "}
          <a
            href="mailto:sales@infynno.com"
            className="text-[#14A800] hover:underline"
            aria-label="sales@infynno.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            sales@infynno.com
          </a>
          . If you&apos;d rather not receive this kind of email, you can{" "}
          <a href="#" className="text-[#14A800] hover:underline">
            unsubscribe
          </a>{" "}
          or{" "}
          <a href="#" className="text-[#14A800] hover:underline">
            manage your email preferences
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default EmailVerificationTemplate;

const EmailIcon: React.FC = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
    </svg>
  );
};