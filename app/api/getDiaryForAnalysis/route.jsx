import Diary from "@/app/models/Diary";
import Task from "@/app/models/Task";
import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async(req) => {
    const body = await req.json();
    const currentDate = body.date;
    const cookieStore = await cookies();
    let data = null;
    let secondData = null;
    const token = cookieStore.get("token")?.value;
    if(!token){
        return NextResponse.redirect(new URL("/",req.url));
    }else{
        await connectDB();
        const findDiary = await Diary.find({});
        const findTask = await Task.find({});
        findDiary.forEach(e => {
            if(e.date.toString().slice(0, 15) === currentDate.toString()){
                data = e;
            }
        });
        findTask.forEach(e => {
            if(e.date.toString().slice(0, 15) === currentDate.toString()){
                secondData = e;
            }
        });

        if(data == null && secondData == null){
            return NextResponse.json({message:"failed"})
        }
        return NextResponse.json({message:"success",data,secondData})
    }
}