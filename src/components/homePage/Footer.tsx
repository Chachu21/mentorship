import Link from "next/link";
import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="container mx-auto max-w-screen-2xl bg-gray-800 dark:bg-gray-800 pt-4 pb-8 xl:pt-8 text-white">
      <div className="flex flex-col space-y-3">
        <div className="max-w-screen-lg px-4 mx-auto text-gray-400 xl:max-w-screen-xl sm:px-6 md:px-8 dark:text-gray-300">
          <ul className="flex md:space-x-36 space-x-0 justify-center pb-8 text-lg font-light">
            <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
              <div className="text-center">
                <h2 className="text-gray-500 dark:text-gray-200 text-md uppercase mb-4">
                  Components
                </h2>
                <ul>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="/mentors">Browse mentors</Link>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="/auth">become a mentor</Link>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="/auth">become a mentee</Link>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link
                      href="#"
                      className="lg:text-2xl text-xl  text-cc font-pacifico"
                    >
                      Mentorship
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-1/2 md:w-1/3 lg:w-1/3">
              <div className="text-center">
                <h2 className="text-gray-500 dark:text-gray-200 text-md uppercase mb-4">
                  About
                </h2>
                <ul>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="/seting">About</Link>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="them">Privacy policy</Link>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="/why-mentorship">Why mentorship</Link>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white">
                    <Link href="/kfgjasd">FAQ</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="pt-8 flex border-t border-gray-200 max-w-xs mx-auto items-center justify-between">
            <Link href="https://www.facebook.com/">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
              </svg>
            </Link>
            <Link href="https://x.com/?lang=en">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
              </svg>
            </Link>
            <Link href="https://github.com/Chachu21/mentorship">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                viewBox="0 0 1792 1792"
              >
                <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
              </svg>
            </Link>
            <Link href="https://www.linkedin.com/">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-xl transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex md:justify-end justify-center items-center text-white">
          &copy; {year} Mentorship &reg; plc. all rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
