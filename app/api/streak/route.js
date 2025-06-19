import Diary from "@/app/models/Diary";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const diaries = await Diary.find({});
    if (!diaries.length) return NextResponse.json({ streak: 0 });

    // Normalize diary dates and sort them from latest to oldest
    const normalizedDiaries = diaries
      .map(d => {
        const date = new Date(d.date);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      })
      .sort((a, b) => b - a); // latest to oldest

    let streak = 0;
    let currentDate = normalizedDiaries[0]; // Start from latest diary date

    for (let i = 0; i < normalizedDiaries.length; i++) {
      const diaryDate = normalizedDiaries[i];

      if (diaryDate.getTime() === currentDate.getTime()) {
        streak++;
      } else {
        const prevDay = new Date(currentDate);
        prevDay.setDate(prevDay.getDate() - 1);

        if (diaryDate.getTime() === prevDay.getTime()) {
          streak++;
          currentDate = diaryDate; // move back for next comparison
        } else {
          break; // Streak broken
        }
      }
    }

    return NextResponse.json({ streak });

  } catch (error) {
    console.error("Error calculating streak:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
