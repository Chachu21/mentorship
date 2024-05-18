"use client";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export const Footers = () => {
  const router = usePathname();
  const isAuthRoute = router.startsWith("/auth");
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      {isAuthRoute ? (
        <div className="container my-3 mx-auto max-w-[1336px] bg-gray-900  text-center text-white bottom-0 py-16">
          &copy; {year} Mentorship &reg; plc. all right are reserved.
        </div>
      ) : (
        <Footer />
      )}
    </>
  );
};
