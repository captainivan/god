import Diary from "@/app/models/Diary";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    const useParams = await params;
    const currentParam = useParams.slug;
    try {
        if (currentParam[0] === "This Month") {
            const date = new Date();
            const currentMonth = date.getMonth();
            const currentYear = date.getFullYear();
            const array = [];
            const pointArray = [];

            await connectDB();
            const diaryList = await Diary.find({});

            diaryList.forEach((diary) => {
                const diaryDate = new Date(diary.date);
                const diaryMonth = diaryDate.getMonth();
                const diaryYear = diaryDate.getFullYear();

                if (diaryMonth === currentMonth && diaryYear === currentYear) {
                    array.push(diary);
                }
            });

            array.forEach((diary) => {
                const diaryDate = new Date(diary.date);
                const dayArray = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const dateNum = diaryDate.getDate();
                const monthName = dayArray[diaryDate.getMonth()];

                let diaryPointer = diary.rating;


                pointArray.push({
                    month: `${dateNum} ${monthName}`,
                    Rate: diaryPointer
                });
            });
            return NextResponse.json({ array, pointArray, message: "success" });
        }

        if (currentParam[0] === "This Year") {
            const date = new Date();
            const currentYear = date.getFullYear();
            const dayArray = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const array = [];
            const monthlyData = Array(12).fill(0);

            await connectDB();
            const diaryList = await Diary.find({});

            diaryList.forEach((diary) => {
                const diaryDate = new Date(diary.date);
                if (diaryDate.getFullYear() === currentYear) {
                    array.push(diary);

                    const diaryMonth = diaryDate.getMonth();
                    let diaryPointer = diary.rating;

                    monthlyData[diaryMonth] = diaryPointer;
                }
            });

            const pointArray = monthlyData.map((total, index) => ({
                month: dayArray[index],
                Rate: total
            }));

            return NextResponse.json({
                array,
                pointArray,
                message: "success"
            });
        }

        if (currentParam[0] === "This Week") {
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
        
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
        
            await connectDB();
            const alldiarys = await Diary.find({});
            const weeklydiarys = alldiarys.filter(diary => {
                const diaryDate = new Date(diary.date);
                return diaryDate >= startOfWeek && diaryDate <= endOfWeek;
            });
        
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const weeklyTotals = Array(7).fill(0);
        
            weeklydiarys.forEach(diary => {
                const date = new Date(diary.date);
                const dayIndex = date.getDay();
                let completed = diary.rating;
                weeklyTotals[dayIndex] = completed;
            });
        
            const pointArray = weeklyTotals.map((total, index) => ({
                month: dayNames[index],
                Rate: total
            }));
        
            return NextResponse.json({
                pointArray,
                message: "success"
            });
        }
        


        return NextResponse.json({ message: "No match" });

    } catch (error) {
        console.error("Error fetching diary data:", error);
        return NextResponse.json({ error: error.message });
    }
}