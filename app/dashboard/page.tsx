// src/app/dashboard/page.tsx
'use client';
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [myTask, setMyTask] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const tasks = await axios.get("https://dcentralised-fiver-backend.onrender.com/v1/userMain/alltasks", {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setMyTask(tasks.data);
                console.log(tasks.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTask();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-5">Dashboard</h1>

            {myTask.slice().reverse().map((task, index) => (
                <div key={index} className="flex flex-col justify-center items-center mb-6">
                    
                    <h3 className="text-3xl">Task: {
                    //@ts-ignore
                    task.title}</h3>
                    <div className="flex flex-wrap justify-center mt-5 gap-4 w-[700px]">
                        
                        { //@ts-ignore
                        task.options.map((option) => (
                            <div key={option.id} className="flex flex-col justify-center items-center">
                                <img className="w-[270px] h-[180px]" src={option.image} alt={`Option ${option.id}`} />
                                <p className="text-lg">Votes: 100/1000 (10%)</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
