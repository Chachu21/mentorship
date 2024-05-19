"use client";
import Image from "next/image";
import React, { useState } from "react";
//interfaces for typscript type checks
interface FAQProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<{ faq: FAQProps }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 shadow-sm w-full">
      <button
        className="flex justify-between items-center w-full py-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[16px] font-semibold">{faq.question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-8 h-8 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
    </div>
  );
};

const FAQs: React.FC<{ faqs: FAQProps[] }> = ({ faqs }) => {
  return (
    <div className="">
      {faqs.map((faq, index) => (
        <FAQItem key={index} faq={faq} />
      ))}
    </div>
  );
};

// Example usage:
const FAQ: React.FC = () => {
  const faqs: FAQProps[] = [
    {
      question:
        "What is the initial step to finding the right mentor for your development and IT goals and understanding the associated mentorship costs?",
      answer:
        "One of the initial steps in mentorship is identifying the specific skills you require for your growth journey. Mentorship platforms like Upwork match you with experienced mentors who possess a diverse range of expertise in development and IT, ready to guide you in achieving your goals.",
    },
    {
      question:
        "Why should I use Mentorship to find mentors for development and IT guidance?",
      answer:
        "Mentorship offers you the flexibility you need to find the right guidance for your development and IT journey.",
    },
    {
      question: "What are the benefits of participating in an EQUB?",
      answer:
        "Description of the advantages of EQUB membership, such as access to interest-free loans, financial assistance, and community support.",
    },

    // Add more FAQs as needed
  ];

  return (
    <section className="flex md:flex-row flex-col justify-between">
      <div className="flex flex-col py-5 md:py-20 w-full order-1 md:order-2 flex-1">
        <h2 className="text-2xl font-semibold  my-8 text-[#1F284F]">
          Frequently Asked Questions
        </h2>
        <FAQs faqs={faqs} />
      </div>
    </section>
  );
};

export default FAQ;
