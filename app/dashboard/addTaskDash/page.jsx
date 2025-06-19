"use client"
import Data from "@/app/data/Lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Notebook, ClipboardCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoadingComp from "../dashComponents/Loadingcomp";
import { toast } from "sonner";


const Page = () => {
    const [rating, setRating] = useState("");
    const [diaryData, setDiaryData] = useState({});
    const [taskData, setTaskData] = useState({});
    const [loading,setLoading] = useState(false);
    const [loadingSecond,setLoadingSecond] = useState(false);

    const handleTaskChange = (value, key) => {
        setTaskData((prev) => (
            {
                ...prev,
                [key]: value
            }
        ))
    }

    const handleDiaryFormChange = (value, key) => {
        setDiaryData((prev) => (
            {
                ...prev,
                [key]: value
            }
        ))
    }

    useEffect(() => {
        console.log(diaryData, taskData)
    }, [diaryData, taskData])

    const handleDiaryFormSubmit = async (e) => {
        if (!rating) {
            alert("rate the day");
        } else {
            e.preventDefault();
            setLoading(true)
            const api = await fetch(`../api/diary`, {
                method: "POST",
                body: JSON.stringify({ 
                    questionOne: diaryData.questionOne,
                    questionTwo: diaryData.questionTwo,
                    questionThree: diaryData.questionThree,
                    questionFour: diaryData.questionFour,
                    rating: diaryData.rating
                 })
            })
            const res = await api.json();
            console.log(res);
            setLoading(false);
            toast(res.message)
        }
    }

    const handleTaskFormSubmit = async (e) => {
            e.preventDefault();
            setLoadingSecond(true)
            const api = await fetch(`../api/task`, {
                method: "POST",
                body: JSON.stringify({ 
                    taskOne: taskData.taskOne,
                    taskTwo: taskData.taskTwo,
                    taskThree: taskData.taskThree,
                    taskFour: taskData.taskFour,
                 })
            })
            const res = await api.json();
            console.log(res);
            setLoadingSecond(false);
            toast(res.message)
    }

    return (
        <div className="h-full flex flex-col items-center p-5">
            <div className="bg-black w-full p-5 rounded-lg">
                <p className="text-white flex gap-2">Toady's Diary <Notebook /></p>
                <form onSubmit={handleDiaryFormSubmit} className="text-white mt-5 ">
                    <div className="grid w-full gap-3 mb-5">
                        <Label className="text-white/80" htmlFor="question-one">Did I live today in alignment with my mission and values?</Label>
                        <Input required placeholder="Type your Response here" id="question-one" onChange={(e) => { handleDiaryFormChange(e.target.value, "questionOne") }} />
                    </div>
                    <div className="grid w-full gap-3 mb-5">
                        <Label className="text-white/80" htmlFor="question-two">What challenged me today, and how did I respond to it?</Label>
                        <Textarea required placeholder="Type your Response here." id="question-two" onChange={(e) => { handleDiaryFormChange(e.target.value, "questionTwo") }} />
                    </div>
                    <div className="grid w-full gap-3">
                        <Label className="text-white/80" htmlFor="question-three">What am I grateful for today, and what did I learn?</Label>
                        <Textarea required placeholder="Type your Response here." id="question-three" onChange={(e) => { handleDiaryFormChange(e.target.value, "questionThree") }} />
                    </div>
                    <div className="grid w-full gap-3 mt-5">
                        <Label className="text-white/80" htmlFor="question-four">What is the one thing I will try to change tomorrow? </Label>
                        <Textarea required placeholder="Type your Response here." id="question-four" onChange={(e) => { handleDiaryFormChange(e.target.value, "questionFour") }} />
                    </div>
                    <Label className="text-white/80 mt-5">Rate Your Day ?</Label>
                    <div className="flex justify-evenly gap-3 mt-2  bg-white/10  p-1 rounded-4xl">
                        {
                            Data.map((e, i) => (
                                <div
                                    style={rating === e.name ? { backgroundColor: "rgba(255, 255, 255, 0.597)" } : null}
                                    className="
                                flex 
                                justify-center 
                                items-center
                                 hover:bg-white/20 
                                cursor-pointer 
                                h-8 w-8 p-1 
                                rounded-4xl"
                                    key={i}
                                    onClick={() => { setRating(e.name), handleDiaryFormChange(e.point, "rating") }}
                                >{e.emoji}</div>
                            ))
                        }
                    </div>
                    <Button type="submit" className="mt-5 w-full">{loading ? <LoadingComp/> :"Submit Report"}</Button>
                </form>
            </div>
            <div className="bg-black w-full p-5 rounded-lg mt-5">
                <p className="text-white flex gap-2">
                    Add Task's For Tomorrow <ClipboardCheck />
                </p>
                <form onSubmit={handleTaskFormSubmit} className="text-white mt-5">
                    <div className="grid w-full gap-3 mb-5">
                        <Label className="text-white/80" htmlFor="task1">
                            Task 1
                        </Label>
                        <Input
                            placeholder="Enter Task 1"
                            id="task1"
                            onChange={(e) => handleTaskChange(e.target.value, "taskOne")}
                        />
                    </div>
                    <div className="grid w-full gap-3 mb-5">
                        <Label className="text-white/80" htmlFor="task2">
                            Task 2
                        </Label>
                        <Textarea
                            placeholder="Enter Task 2"
                            id="task2"
                            onChange={(e) => handleTaskChange(e.target.value, "taskTwo")}
                        />
                    </div>
                    <div className="grid w-full gap-3 mb-5">
                        <Label className="text-white/80" htmlFor="task3">
                            Task 3
                        </Label>
                        <Textarea
                            placeholder="Enter Task 3"
                            id="task3"
                            onChange={(e) => handleTaskChange(e.target.value, "taskThree")}
                        />
                    </div>
                    <div className="grid w-full gap-3 mb-5">
                        <Label className="text-white/80" htmlFor="task4">
                            Task 4
                        </Label>
                        <Textarea
                            placeholder="Enter Task 4"
                            id="task4"
                            onChange={(e) => handleTaskChange(e.target.value, "taskFour")}
                        />
                    </div>
                    <Button type="submit" className="mt-5 w-full">{loadingSecond ? <LoadingComp/> :"Submit Task's"}</Button>
                </form>
            </div>
        </div>
    );
}
export default Page;