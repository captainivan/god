"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Notebook, ClipboardCheck, BookCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Data from "@/app/data/Lookup";
import NavBar from "@/app/dashboard/dashComponents/Navbar";
import Footer from "@/app/dashboard/dashComponents/Footer";

const Page = ({ params }) => {
    const [data, setData] = useState({
        questionOne: "",
        questionTwo: "",
        questionThree: "",
        questionFour: "",
        rating: "",
        taskOne: "",
        taskTwo: "",
        taskThree: "",
        taskFour: "",
        taskOneCompleted: false,
        taskTwoCompleted: false,
        taskThreeCompleted: false,
        taskFourCompleted: false,
        date: null
    });

    useEffect(() => {
        const dataApi = async () => {
            const awaitedParam = await params;
            const id = awaitedParam.id;

            const api = await fetch("/api/getDiarybyID", {
                method: "POST",
                headers: {
                    type: "application/json"
                },
                body: JSON.stringify({
                    id: id[0],
                    secondId: id[1]
                })
            })
            const res = await api.json();
            console.log(res)
            setData({
                questionOne: res.findDiary.questionOne,
                questionTwo: res.findDiary.questionTwo,
                questionThree: res.findDiary.questionThree,
                questionFour: res.findDiary.questionFour,
                rating: res.findDiary.rating,
                taskOne: res.findTask.taskOne,
                taskTwo: res.findTask.taskTwo,
                taskThree: res.findTask.taskThree,
                taskFour: res.findTask.taskFour,
                taskOneCompleted: res.findTask.taskOneCompleted,
                taskTwoCompleted: res.findTask.taskTwoCompleted,
                taskThreeCompleted: res.findTask.taskThreeCompleted,
                taskFourCompleted: res.findTask.taskFourCompleted,
                date: res.findDiary.date.toString()
            })
        }
        dataApi()
    }, [])

    useEffect(() => { console.log(data) }, [data])

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center  p-5">
                <div className="bg-black w-full p-5 rounded-lg">
                    <p className="text-white flex gap-2">Diary of {data.date ? data.date.slice(0, 10) : ""} <Notebook /></p>
                    <form className="text-white mt-5 ">
                        <div className="grid w-full gap-3 mb-5">
                            <Label className="text-white/80" htmlFor="question-one">Did I live today in alignment with my mission and values?</Label>
                            <Input defaultValue={data.questionOne} readOnly id="question-one" />
                        </div>
                        <div className="grid w-full gap-3 mb-5">
                            <Label className="text-white/80" htmlFor="question-two">What challenged me today, and how did I respond to it?</Label>
                            <Textarea defaultValue={data.questionTwo} readOnly id="question-two" />
                        </div>
                        <div className="grid w-full gap-3">
                            <Label className="text-white/80" htmlFor="question-three">What am I grateful for today, and what did I learn?</Label>
                            <Textarea defaultValue={data.questionThree} readOnly id="question-three" />
                        </div>
                        <div className="grid w-full gap-3 mt-5">
                            <Label className="text-white/80" htmlFor="question-four">What is the one thing I will try to change tomorrow? </Label>
                            <Textarea defaultValue={data.questionFour} readOnly id="question-four" />
                        </div>
                        <Label className="text-white/80 mt-5">Day Rating</Label>
                        <div className="flex justify-evenly gap-3 mt-2  bg-white/10  p-1 rounded-4xl">
                            {
                                Data.map((e, i) => (
                                    <div
                                        style={data.rating === e.point ? { backgroundColor: "rgba(255, 255, 255, 0.597)" } : null}
                                        className="
                                flex 
                                justify-center 
                                items-center
                                 hover:bg-white/20 
                                cursor-pointer 
                                h-8 w-8 p-1 
                                rounded-4xl"
                                        key={i}
                                    >{e.emoji}</div>
                                ))
                            }
                        </div>
                    </form>
                </div>
                <div className="bg-black w-full p-5 rounded-lg mt-5">
                    <p className="text-white flex gap-2">
                        Task of {data.date ? data.date.slice(0, 10) : ""} <ClipboardCheck />
                    </p>
                    <form className="text-white mt-5">
                        <div className="grid w-full  gap-3 mb-5">
                            <Label className="text-white/80" htmlFor="task1">
                                Task 1
                            </Label>
                            <div className="flex items-center">
                                <Input
                                    placeholder="Enter Task 1"
                                    id="task1"
                                    readOnly
                                    defaultValue={data.taskOne}
                                />
                                {data.taskOneCompleted ? <BookCheck className="text-green-500 ml-2" /> : <BookCheck className="text-red-500 ml-2" />}
                            </div>
                        </div>
                        <div className="grid w-full gap-3 mb-5">
                            <Label className="text-white/80" htmlFor="task2">
                                Task 2
                            </Label>
                            <div className="flex items-center">
                                <Textarea
                                    placeholder="Enter Task 2"
                                    id="task2"
                                    readOnly
                                    defaultValue={data.taskTwo}

                                />
                                {data.taskTwoCompleted ? <BookCheck className="text-green-500 ml-2" /> : <BookCheck className="text-red-500 ml-2" />}
                            </div>
                        </div>
                        <div className="grid w-full gap-3 mb-5">
                            <Label className="text-white/80" htmlFor="task3">
                                Task 3
                            </Label>
                            <div className="flex items-center">
                                <Textarea
                                    placeholder="Enter Task 3"
                                    id="task3"
                                    readOnly
                                    defaultValue={data.taskThree}
                                />
                                {data.taskThreeCompleted ? <BookCheck className="text-green-500 ml-2" /> : <BookCheck className="text-red-500 ml-2" />}
                            </div>
                        </div>
                        <div className="grid w-full gap-3 mb-5">
                            <Label className="text-white/80" htmlFor="task4">
                                Task 4
                            </Label>
                            <div className="flex items-center">
                                <Textarea
                                    placeholder="Enter Task 4"
                                    id="task4"
                                    readOnly
                                    defaultValue={data.taskFour}
                                />
                                {data.taskFourCompleted ? <BookCheck className="text-green-500 ml-2" /> : <BookCheck className="text-red-500 ml-2" />}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Page;