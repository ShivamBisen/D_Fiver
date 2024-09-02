"use client"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "./Buttons"
import axios from "axios"
import { headers } from "next/headers"



export const Model = ({closeModel}:{closeModel:()=>void}) => {
    const [inputs, setInputs] = useState<{imageUrl:string}[]>([{imageUrl : ""}])
    const [title, setTitle] = useState("")

    const AddInput = () => {
        setInputs([...inputs, {imageUrl:""}])

    }

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs]
        newInputs[index].imageUrl = value
        setInputs(newInputs)
    }

    const handleSubmit = async() => {
        const payload = {
            "title": title,
            "signature":"kjgfdjkfgjd",
            "options": inputs
        }

        const response = await axios.post("http://localhost:3000/v1/userMain/task",payload,{
            headers:{
                Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTcyNTI3MDYwNX0.uNcdKAegVpGq1S25pqHcMlpXre7pvA4zR6HgayjsvB8'
            }
        })
        console.log(response.data)

        
        console.log(payload)
        console.log(inputs)
        
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
                            <input className="w-full h-[40px] rounded-lg border border-gray-700 p-4 " 
                            placeholder="Paste Image Link Here " 
                            value={input.imageUrl}
                            onChange={(e)=>handleInputChange(index,e.target.value)}
                            type="text" /> 

                        )
                    })
                }
                 


                 <SecondaryButton onClick={AddInput} > Add</SecondaryButton>  
                </div>
                
                
                <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
                
            </div>
        </div>
    )
}