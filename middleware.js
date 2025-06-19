import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/dashboard","/dashboard/addTaskDash"];

export const middleware = async (req) => {
    const {pathname} = req.nextUrl;
    if(!protectedRoutes.includes(pathname)){
        return NextResponse.next()
    }
    const token = req.cookies.get("token")?.value;
    if(!token){
        return NextResponse.redirect(new URL("/", req.url));
    }
    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_TOKEN));
        return NextResponse.next();
    } catch (error) {
        console.log("jwt verify failed", error)
        return NextResponse.redirect(new URL("/",req.url));
    }
}