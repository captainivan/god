"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import TaskComp from "./TaskComp";
import { useRouter } from "next/navigation";
import ChartTest from "./chartTest";
import SecondChartTest from "./secondCharTtest";

const MainDash = () => {
  const [dates, setDates] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      try {
        const api = await fetch("https://3000-firebase-god-1748788752429.cluster-isls3qj2gbd5qs4jkjqvhahfv6.cloudworkstations.dev/api/diary", {
          method: "GET"
        });
        const res = await api.json();
        console.log(res);
        setDates(
          res.diaryData.map((item) => new Date(item.date))
        )
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])

  const redirectHandle = (e) => {
    const set = e.toString();
    dates.map(async (i) => {
      if (i.toString().slice(0, 15) === set.slice(0, 15)) {
        const api = await fetch("/api/getDiaryForAnalysis", {
          method: "POST",
          headers: {
            type: "application/json"
          },
          body: JSON.stringify({
            date: i.toString().slice(0, 15)
          })
        })
        const res = await api.json();
        router.push(`/analysis/${res.data._id}/${res.secondData._id}`)
        console.log(res)
      }
    })
  }

  return (
    <>
      <div className="p-5 flex items-center flex-col">
        <Calendar
          mode="multiple"
          selected={dates}
          onDayClick={(e) => redirectHandle(e)}
          classNames={{
            day_selected: "bg-white text-black"
          }}
          className="bg-black flex flex-col justify-center items-center text-white dark:bg-zinc-900 dark:text-white rounded-lg shadow h-80 w-80 mb-5"
        />
        <TaskComp />
        <ChartTest />
        <SecondChartTest/>
      </div>
    </>
  );
};

export default MainDash;
