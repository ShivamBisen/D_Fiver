"use client"
import { PrimaryButton, SecondaryButton } from "./Buttons"



export const Model = ({closeModel}:{closeModel:()=>void}) => {

   

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black flex flex-col gap-5">

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Uplode Image</h1>
                    <SecondaryButton onClick={closeModel}>X</SecondaryButton>
                </div>
                
                <input className="w-full h-[40px] rounded-lg border border-gray-700 p-4 " placeholder="Paste Image Link Here " type="text" />
                <PrimaryButton onClick={closeModel}>Submit</PrimaryButton>
                
            </div>
        </div>
    )
}