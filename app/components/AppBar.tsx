"use client"
import { PrimaryButton} from "./Buttons";

export const AppBar = () => {
    return (
        <div className="flex justify-between w-full p-4">
            <div className="text-2xl font-bold ">
                <h1>D Fiver.</h1>
            </div>
            <div className="">
                <PrimaryButton onClick={()=>{}}>Connect Wallet</PrimaryButton>
            </div>
        </div>
    );
};
