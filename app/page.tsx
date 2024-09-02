import Image from "next/image";
import { AppBar } from "./components/AppBar";
import { Hero } from "./components/Hero";
import { Model } from "./components/Model";

export default function Home() {
  return (
    <main className=" w-full flex justify-center">
      <div className="w-[1440px] flex flex-col gap-3">
        
        <Hero />
        
       </div>
       

     
    </main>
  );
}
