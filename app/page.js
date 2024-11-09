'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter hook
import Image from "next/image";

export default function Home() {
  const router = useRouter(); // Initialize useRouter

  const handleRedirect = () => {
    router.push("/select-role"); // Navigate to the /select-role route
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center w-full h-[60vh]">
        <h1 className="text-3xl font-bold">Welcome to Home page</h1>
      </div>

      <div className="flex justify-center mt-4">
        <Button onClick={handleRedirect}>Go to Select Role</Button> {/* Button to navigate */}
      </div>
    </div>
  );
}
