"use client"
import { Flame, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const NavBar = () => {
    const [streak,setStreak] =useState(0)
    useEffect(()=>{
        const fetchStreak = async () => {
            const api = await fetch(`/api/streak`);
            const res = await api.json();
            console.log(res);
            setStreak(res.streak)
        }
        fetchStreak();
    },[])
    return (
        <nav className="w-full p-5 flex justify-between items-center ">
            <div className="flex justify-center items-center">
                <Menu />
                <h1 className="text-xl font-bold ml-3">Analytics</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center bg-black text-white p-1 m-2 rounded-2xl">
                   <span className="mr-1 ml-1 font-bold">
                        {streak < 10 ? `0${streak}` : streak}
                    </span> <Flame color="white" />
                </div>
                <div className="bg-black text-white font-bold rounded-[50%] h-9 w-9 flex justify-center items-center">
                    L
                </div>
            </div>
        </nav>
    )
}
export default NavBar;