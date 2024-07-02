"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { categories } from "../constants/categories";
import { isEmptyArray } from "formik";
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

const FAQ = () => {
  const pathname = usePathname()
   const category = categories.find(cat => cat.href.pathname === pathname);
  const faqs: FAQProps[] = category?.faqs ? category.faqs : [];

  return (
    <section className="flex md:flex-row flex-col justify-between">
      <div className="flex flex-col py-5 md:py-20 w-full order-1 md:order-2 flex-1">
       { !isEmptyArray(faqs) && <h2 className="text-2xl font-semibold  my-8 text-[#1F284F]">
          Frequently Asked Questions
        </h2>}
        <FAQs faqs={faqs} />
      </div>
    </section>
  );
};

export default FAQ;
