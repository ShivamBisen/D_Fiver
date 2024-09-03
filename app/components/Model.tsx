"use client"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "./Buttons"
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import axios from "axios"
import { headers } from "next/headers"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";



export const Model = ({closeModel}:{closeModel:()=>void}) => {
    const [inputs, setInputs] = useState<{imageUrl:string}[]>([{imageUrl : ""}])
    const [title, setTitle] = useState("")
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [txSignature, setTxSignature] = useState("");

    const AddInput = () => {
        setInputs([...inputs, {imageUrl:""}])

    }

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs]
        newInputs[index].imageUrl = value
        setInputs(newInputs)
    }

    const onSubmit = async() => {
        const payload = {
            "title": title,
            "signature":txSignature,
            "options": inputs
        }

        const response = await axios.post("https://dcentralised-fiver-backend.onrender.com/v1/userMain/task",payload,{
            headers:{
                Authorization : localStorage.getItem("token")
            }
        })
        console.log(response.data)

        
        console.log(payload)
        console.log(inputs)
        
    }
    async function makePayment() {

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey!,
                toPubkey: new PublicKey("2iDkXvx2oPKRvPAFCUw3TZyXqBcZBbcufkhq2ZAkxbiB"),
                lamports: 100000000,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        setTxSignature(signature);
    }


   

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-black flex flex-col gap-5">

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Create Task </h1>
                    <SecondaryButton onClick={closeModel}>X</SecondaryButton>
                </div>

                <div className="">
                    <h3>Title</h3>
                    <input className="w-full h-[40px] rounded-lg border border-gray-700 p-4 " 
                            placeholder="Title "
                            onChange={(e)=>{setTitle(e.target.value)}}
                            type="text" /> 
                </div>


                <div className="flex flex-col gap-2">
                <h3>Image</h3>

                {
                    inputs.map((input,index)=>{
                        return(
                            <input key={index} className="w-full h-[40px] rounded-lg border border-gray-700 p-4 " 
                            placeholder="Paste Image Link Here " 
                            value={input.imageUrl}
                            onChange={(e)=>handleInputChange(index,e.target.value)}
                            type="text" /> 

                        )
                    })
                }
                 


                 <SecondaryButton onClick={AddInput} > Add</SecondaryButton>  
                </div>
                
                
                <div className="flex justify-center">
            <button onClick={txSignature ? onSubmit : makePayment} type="button" className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {txSignature ? "Submit Task" : "Pay 0.1 SOL"}
            </button>
        </div>
                
            </div>
        </div>
    )
}