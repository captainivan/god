import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import Diary from "@/app/models/Diary";
import connectDB from "@/lib/connectDB";

export const POST = async (req) => {
  const { questionOne, questionTwo, questionThree, questionFour, rating } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url))
  } else {
    const tokenVerification = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_TOKEN));
    if (tokenVerification) {
      await connectDB()
      const newDiary = await Diary.create({
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        rating
      });
      return NextResponse.json({ message: "success", newDiary });
    } else {
      return NextResponse.json({ message: "failed" });
    }
  }
};


export const GET = async (req) => {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await connectDB();
    const diaryData = await Diary.find({});
    return NextResponse.json({ message: "success", diaryData });
  } catch (error) {
    console.error("Error fetching diary data:", error);
    return NextResponse.json({ error: error.message });
  }
};
