import Diary from "@/app/models/Diary";
import Task from "@/app/models/Task";
import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export const POST = async (req)=> {
    const body = await req.json();
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if(!token){
        return NextResponse.redirect(new URL("/",req.url));
    }else{
        try{
            await connectDB();
            const findDiary = await Diary.findById({_id:body.id});
            const findTask = await Task.findById({_id:body.secondId});
            return NextResponse.json({message:"sucess",findDiary,findTask})
        }catch(error){
            console.log(error)
            return NextResponse.json({error})
        }
    }
}
