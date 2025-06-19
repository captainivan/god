import Task from "@/app/models/Task";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";


export const POST = async (req, { params }) => {
    try {
        const awaitedparam = await params;
        const paramSlug = awaitedparam.slug;

        if (paramSlug[0] === "This Month") {
            const date = new Date();
            const currentMonth = date.getMonth();
            const currentYear = date.getFullYear();
            const array = [];
            const pointArray = [];

            await connectDB();
            const taskList = await Task.find({});

            taskList.forEach((task) => {
                const taskDate = new Date(task.date);
                const taskMonth = taskDate.getMonth();
                const taskYear = taskDate.getFullYear();

                if (taskMonth === currentMonth && taskYear === currentYear) {
                    array.push(task);
                }
            });

            array.forEach((task) => {
                const taskDate = new Date(task.date);
                const dayArray = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const dateNum = taskDate.getDate();
                const monthName = dayArray[taskDate.getMonth()];

                let taskPointer = 0;
                if (task.taskOneCompleted) taskPointer++;
                if (task.taskTwoCompleted) taskPointer++;
                if (task.taskThreeCompleted) taskPointer++;
                if (task.taskFourCompleted) taskPointer++;


                pointArray.push({
                    month: `${dateNum} ${monthName}`,
                    task: taskPointer
                });
            });



            return NextResponse.json({array,pointArray, message: "success" });
        }

        if (paramSlug[0] === "This Year") {
            const date = new Date();
            const currentYear = date.getFullYear();
            const dayArray = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const array = [];
            const monthlyData = Array(12).fill(0);

            await connectDB();
            const taskList = await Task.find({});

            taskList.forEach((task) => {
                const taskDate = new Date(task.date);
                if (taskDate.getFullYear() === currentYear) {
                    array.push(task);

                    const taskMonth = taskDate.getMonth();
                    let taskPointer = 0;
                    if (task.taskOneCompleted) taskPointer++;
                    if (task.taskTwoCompleted) taskPointer++;
                    if (task.taskThreeCompleted) taskPointer++;
                    if (task.taskFourCompleted) taskPointer++;

                    monthlyData[taskMonth] += taskPointer;
                }
            });

            const pointArray = monthlyData.map((total, index) => ({
                month: dayArray[index],
                task: total
            }));

            return NextResponse.json({
                array,
                pointArray,
                message: "success"
            });
        }

        if (paramSlug[0] === "This Week") {
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
        
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
        
            await connectDB();
            const allTasks = await Task.find({});
            const weeklyTasks = allTasks.filter(task => {
                const taskDate = new Date(task.date);
                return taskDate >= startOfWeek && taskDate <= endOfWeek;
            });
        
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const weeklyTotals = Array(7).fill(0);
        
            weeklyTasks.forEach(task => {
                const date = new Date(task.date);
                const dayIndex = date.getDay();
                let completed = 0;
                if (task.taskOneCompleted) completed++;
                if (task.taskTwoCompleted) completed++;
                if (task.taskThreeCompleted) completed++;
                if (task.taskFourCompleted) completed++;
                weeklyTotals[dayIndex] += completed;
            });
        
            const pointArray = weeklyTotals.map((total, index) => ({
                month: dayNames[index],
                task: total
            }));
        
            return NextResponse.json({
                pointArray,
                message: "success"
            });
        }
        
        return NextResponse.json({ message: "No match" });

    } catch (error) {
        console.error("Error fetching task data:", error);
        return NextResponse.json({ error: error.message });
    }
}
