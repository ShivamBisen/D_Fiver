'use client';

import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
    title: string;
    options: {
        id: number;
        image: string;
        task_id: number;
    }[];
    id: number;
    amount: number;
}

const UserFeed = () => {
    const [newTask, setNewTask] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:3000/v1/user/taskfeed", {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTcyNTI4Mzc4M30.CsIAUjpahy7cfO6Nz9E3xTDfq22Mw0cg2GIGLu5ROe8"
                    }
                });
                setNewTask(res.data);
                console.log("Fetched tasks:", res.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, []); // Dependency array is empty, so it only runs once when the component mounts.

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!newTask) {
        return <div>No task available</div>;
    }

   

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-5">Feed</h1>

            {newTask.slice().reverse().map((task, index) => (
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

export default UserFeed;
