import User from "@/app/models/Users";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userName, passWord } = await req.json();
    await connectDB();

    const createUser = await User.create({ userName, passWord });

    return NextResponse.json({ message: "User created successful", user: createUser });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Something went wrong" });
  }
};
