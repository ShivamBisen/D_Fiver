"use client"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PrimaryButton} from "./Buttons";
import { useWallet,  } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect } from "react";
import axios from "axios";



export const AppBar = () => {

    const SignSend = async () => {
        const message = new TextEncoder().encode("Hello, World!");
        const signature = await signMessage?.(message);
     
        const response =  await axios.post("https://dcentralised-fiver-backend.onrender.com/v1/userMain/signin",{
            signature,
            publicKey: publicKey?.toString()
        })
        console.log(response.data)
        localStorage.setItem("token", response.data.token);

    }
    
    const {publicKey, signMessage} = useWallet();
    useEffect(()=>{
        SignSend()
    },[publicKey])

    return (
        <div className="flex justify-between w-full p-4">
            <div className="text-2xl font-bold ">
                <h1>D Fiver.</h1>
            </div>
            <div className="flex gap-3">

                
                {!publicKey ?<WalletMultiButton /> :<WalletDisconnectButton />}
            </div>
        </div>
    );
};
