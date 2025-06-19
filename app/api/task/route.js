import Task from "@/app/models/Task";
import connectDB from "@/lib/connectDB";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    const { taskOne,taskTwo,taskThree,taskFour } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url))
    } else {
        const jwtverifyciation = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_TOKEN));
        if (jwtverifyciation) {
            await connectDB();
            const newTask = await Task.create({
                taskOne:taskOne,
                taskTwo:taskTwo,
                taskThree:taskThree,
                taskFour:taskFour
            })
            return NextResponse.json({ message: "success", newTask });
        } else {
            return NextResponse.json({
                message: "failed"
            })
        }
    }
}

export const GET = async(req) => {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;
        if(!token){
            return NextResponse.redirect(new URL("/",req.url));
        }else{
            try {
                await connectDB();
                const taskData = await Task.find({});
                if(taskData.length > 0){
                    return NextResponse.json({taskData})
                }else{
                    return NextResponse.json({taskData:"no task found"})
                }
            } catch (error) {
                return NextResponse.json({error})
            }
        }
}