import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if(!token){
        return NextResponse.redirect(new URL("/dashboard",req.url));
    }else{
        return NextResponse.json({message:"success"})
    }
} 