"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeClosed } from 'lucide-react';
import { toast } from "sonner";

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [tooglePassword, setTogglePassword] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        const checkToken = async () => {
            const api = await fetch(`/api/checkCookie`);
            const data = await api.json();
            if(data.message === "success"){
                router.push("/dashboard")
            }else{
                return;
            }
        }
        checkToken()
    },[])

    const handleSubmission = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const api = await fetch(`/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName,
                    passWord: password
                })
            })
            const data = await api.json();
            toast(data.message)
            console.log(data)
            setLoading(false)
            router.push("/dashboard")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-between h-screen w-screen">
            <div className="text-center mt-20">
                <h1 className="text-4xl font-extrabold mb-1">GODS PLAN</h1>
                <p className="font-bold text-sm">AIM.STRIKE.CONQUER</p>
            </div>
            <div className="flex flex-col items-center bg-black w-full h-[53%] rounded-t-3xl text-white p-5">
                <h1 className="text-2xl font-bold p-5">LOGIN</h1>
                <form onSubmit={handleSubmission} className="w-full">
                    <Input
                        type="text"
                        required
                        className="p-7 mb-10 rounded-4xl"
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="flex justify-center items-center border mb-10 w-full rounded-4xl p-2  ">
                        <div className="flex justify-center items-center w-full ">
                            <input
                                type={tooglePassword ? "text" : "password"}
                                required
                                className=" border-none outline-none p-2  w-full"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="p-2 ">
                            {tooglePassword ? <Eye className=" cursor-pointer" onClick={() => setTogglePassword(!tooglePassword)} /> : <EyeClosed className="text-white cursor-pointer" onClick={() => setTogglePassword(!tooglePassword)} />}
                        </div>
                    </div>
                    <Button type="submit" className="w-full p-7 border border-white  rounded-4xl">
                        {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div> : <h4 className="text-lg font-bold">Login</h4>}
                    </Button>
                </form>
            </div>
        </div>
    );
}
export default Login;