// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader } from "@/components/ui/card";

const SidebarLinks = [
  {
    id: 1,
    name: "Contact Info",
    link: "/mentordashboard/settings",
  },
  {
    id: 2,
    name: "Get Paid",
    link: "/mentordashboard/settings/get-paid",
  },
  {
    id: 3,
    name: "Profile Setting",
    link: "/mentordashboard/profile-setting",
  },
  {
    id: 4,
    name: "Password and Security",
    link: "/mentordashboard/settings/password-and-security",
  },
];

// const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   const handleSidebarItemClick = (link: string) => {
//     router.push(link);
//     setIsSidebarVisible(false);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row min-h-screen">
//       <div
//         className={`${
//           isSidebarVisible ? "block" : "hidden"
//         } sm:block sm:w-[20%] w-full flex flex-col space-y-3 bg-slate-50 sm:h-auto h-full overflow-y-auto`}
//       >
//         <Card className="h-full">
//           <CardHeader>
//             {SidebarLinks.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => handleSidebarItemClick(item.link)}
//                 className="py-3 px-3 cursor-pointer"
//               >
//                 <div>{item.name}</div>
//               </div>
//             ))}
//           </CardHeader>
//         </Card>
//       </div>
//       <div
//         className={`${
//           isSidebarVisible ? "hidden" : "block"
//         } sm:block sm:w-[80%] w-full flex flex-col space-y-3`}
//       >
//         <button
//           className="p-2 bg-slate-50 sm:hidden flex items-center space-x-2"
//           onClick={() => setIsSidebarVisible(true)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
//             />
//           </svg>
//           <span>Back to settings</span>
//         </button>
//         <div className="w-full">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default SettingsLayout;

import SettingsLayout from "@/components/ReusedComponent/SettingLayout";
import React from "react";

const SettingsPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <SettingsLayout sidebarLinks={SidebarLinks}>{children}</SettingsLayout>
  );
};

export default SettingsPage;
