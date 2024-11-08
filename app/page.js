import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (

    <div>
      <Navbar />

      <div className="flex justify-center items-center w-full h-[60vh]">
        <h1 className="text-3xl font-bold">Welcome to Home page</h1>
      </div>

    </div>
  );
}
