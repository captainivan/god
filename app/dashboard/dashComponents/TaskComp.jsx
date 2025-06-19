"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react"
import LoadingComp from "./Loadingcomp";
import { BookCheck, ClipboardCheck } from 'lucide-react';
import JSConfetti from "js-confetti";

const TaskComp = () => {
    const [data, setData] = useState([]);
    const [jsConfetti, setJsConfetti] = useState(null);
    useEffect(() => {
        setJsConfetti(new JSConfetti());
      }, []);
    useEffect(() => {
        const taskDataInfo = async () => {
            try {
                const api = await fetch(`/api/task`);
                if (!api.ok) {
                    throw new Error("Failed to fetch task data");
                }
                const respose = await api.json();
                let taskData = respose.taskData;
                if (taskData === "no task found") {
                    setData({
                        taskOne: "no task found",
                        taskTwo: "no task found",
                        taskThree: "no task found",
                        taskFour: "no task found"
                    })
                } else {
                    setData(taskData[taskData.length - 1])
                }
            } catch (error) {
                console.error("Error fetching task data:", error.message);
            }
        };
        taskDataInfo();
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    const handletaskchange = async (e) => {
        try {
            const api = await fetch(`/api/upDateTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data._id,
                    task: e
                })
            })
            const res = await api.json();
            console.log(res)
            jsConfetti.addConfetti({
                confettiColors: ['#FFC700', '#FF85C0', '#00C1D4', '#A76CF3', '#FF6F61'],
                confettiRadius: 5,        
                confettiNumber: 150,     
            });
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="w-80 flex flex-col  items-center p-5 bg-black rounded-lg text-white">
            {data.taskOne ? (
                <>
                    <div className="text-left text-white/60 flex w-full">Task of The Day <ClipboardCheck className="ml-1" /> </div>
                    <div className="w-full mt-4 bg-black text-white rounded-xl shadow-md">
                        <div className="flex text-white text-lg items-center justify-between border-b border-white/40 p-2 last:border-b-0">
                            <p className="text-sm font-medium">{data.taskOne}</p>
                            {data.taskOne === "no task found" ? null : (
                                data.taskOneCompleted ? (
                                    <BookCheck />
                                ) : (
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-black"
                                        onChange={() => handletaskchange(data.taskOne)}
                                    />
                                )
                            )}
                        </div>
                        <div className="flex text-white text-lg items-center justify-between border-b border-white/40 p-2 last:border-b-0">
                            <p className="text-sm font-medium">{data.taskTwo}</p>
                            {data.taskTwo === "no task found" ? null : (
                                data.taskTwoCompleted ? (
                                    <BookCheck />
                                ) : (
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-black"
                                        onChange={() => handletaskchange(data.taskTwo)}
                                    />
                                )
                            )}
                        </div>
                        <div className="flex text-white text-lg items-center justify-between border-b border-white/40 p-2 last:border-b-0">
                            <p className="text-sm font-medium">{data.taskThree}</p>
                            {data.taskThree === "no task found" ? null : (
                                data.taskThreeCompleted ? (
                                    <BookCheck />
                                ) : (
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-black"
                                        onChange={() => handletaskchange(data.taskThree)}
                                    />
                                )
                            )}
                        </div>
                        <div className="flex text-white text-lg items-center justify-between border-b border-white/40 p-2 last:border-b-0">
                            <p className="text-sm font-medium">{data.taskFour}</p>
                            {data.taskFour === "no task found" ? null : (
                                data.taskFourCompleted ? (
                                    <BookCheck />
                                ) : (
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-black"
                                        onChange={() => handletaskchange(data.taskFour)}
                                    />
                                )
                            )}
                        </div>
                    </div>

                </>
            ) : <LoadingComp />}
        </div>
    )
}
export default TaskComp;