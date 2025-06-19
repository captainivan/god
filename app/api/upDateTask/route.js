import Task from "@/app/models/Task";
import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    const body = await req.json();
    const task = body.task;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    } else {
        try {
            await connectDB();
            const taskData = await Task.findById(body.id);
            if (!taskData) {
                return NextResponse.json({ message: "Task not found" }, { status: 404 });
            }

            if (task === taskData.taskOne) taskData.taskOneCompleted = !taskData.taskOneCompleted;
            if (task === taskData.taskTwo) taskData.taskTwoCompleted = !taskData.taskTwoCompleted;
            if (task === taskData.taskThree) taskData.taskThreeCompleted = !taskData.taskThreeCompleted;
            if (task === taskData.taskFour) taskData.taskFourCompleted = !taskData.taskFourCompleted;

            await taskData.save();
            return NextResponse.json({ taskData, task })
        } catch (error) {
            return NextResponse.json({ error, message: "erroe haens mayday" })
            console.log(error)
        }
    }
}