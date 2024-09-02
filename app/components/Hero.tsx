'use client'

import { useState } from "react"
import { PrimaryButton } from "./Buttons"
import { Model } from "./Model"
import { useRouter } from "next/navigation"




export const Hero = () => {
    const router =  useRouter()
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

    const openModel = () => {
        setIsModelOpen(true);
    }

    const closeModel = () => {
        setIsModelOpen(false);
    }
    const handleNavigate = () => {
        router.push('/dashboard'); // Navigate to the Dashboard page
    };


    return (
        <div className="h-[380px] w-full rounded-3xl bg-[#013811] flex flex-col justify-center items-center mt-10 gap-10">
            <h1 className="text-5xl font-bold max-w-[700px] text-center min-w-[300px] text-white">
                Scale your professional workforce with freelancers
            </h1>
            <div>
                <input
                    className="w-[400px] h-[50px] rounded-lg focus:outline-none text-black p-4"
                    placeholder="Search (it won't work)"
                    type="text"
                />
            </div>
            <div className="w-[600px] text-opacity-70 flex justify-between">
                <p className="text-opacity-60 text-white">Trusted by:</p>
                {["META", "Google", "NETFLIX", "PnG", "PayPal", "Payoneer"].map((item) => (
                    <p key={item} className="text-white">{item}</p>
                ))}
            </div>
            <div className="flex gap-4">
                <PrimaryButton onClick={handleNavigate}>Dashboard</PrimaryButton>
                <PrimaryButton onClick={()=>{router.push("/userFeed")}}>Feed</PrimaryButton>
                <PrimaryButton onClick={openModel}>Upload Image</PrimaryButton>
            </div>
            {isModelOpen && <Model  closeModel={closeModel} />}
        </div>
    );
}
