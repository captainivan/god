import User from "@/app/models/Users";
import connectDB from "@/lib/connectDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export const POST = async (req) => {
    await connectDB();
    const { userName, passWord } = await req.json();
    const findUser = await User.findOne({ userName });
    if (!findUser) {
        return NextResponse.json({ message: "userName does not exist" })
    }
    if (String(findUser.passWord) !== String(passWord)) {
        return NextResponse.json({ message: "Password does not exist"})
    }
    const response = NextResponse.json({ message: "Login sucessful" });
    const token = jwt.sign({
        userName: findUser.userName,
        id: findUser._id
    }, process.env.JWT_TOKEN, { expiresIn: "1d" })
    response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: true
    })
    return response;
}



