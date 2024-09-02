// src/app/dashboard/page.tsx
'use client';
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [myTask, setMyTask] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const tasks = await axios.get("http://localhost:3000/v1/userMain/alltasks", {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTcyNTI3MDYwNX0.uNcdKAegVpGq1S25pqHcMlpXre7pvA4zR6HgayjsvB8"
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
                    <h3 className="text-3xl">Task: {task.title}</h3>
                    <div className="flex flex-wrap justify-center mt-5 gap-4 w-[700px]">
                        {task.options.map((option) => (
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
