"use client"

import React, { useState, useEffect } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const SecondChartTest = () => {
  const [chartData, setChartData] = useState([]);
  const [sortMonth, setSortMonth] = useState(false);
  const [trend, setTrend] = useState(0);

  useEffect(() => {
    const fetchWeek = async () => {
      try {
        const api = await fetch(`/api/secondGraph/This Week`, {
          method: "POST"
        })
        const data = await api.json()
        console.log(data)
        setChartData(data.pointArray)
        setSortMonth(false)
      } catch (error) {
        console.log
      }
    }
    fetchWeek();
  }, [])

  const chartConfig = {
    desktop: {
      label: "Task",
      color: "white"
    }
  }

  const [position, setPosition] = React.useState("This Week")
  const handleValueChange = async (e) => {
    if (e === "This Month") {
      try {
        const api = await fetch(`/api/secondGraph/${e}`, {
          method: "POST"
        })
        const data = await api.json()
        console.log(data)
        setChartData(data.pointArray);
        let totalTask = 0;
        for (let i = 0; i < data.pointArray.length; i++) {
          totalTask += data.pointArray[i].Rate;
        }
        setSortMonth(true)
        let taskRate = Math.floor(totalTask / data.pointArray.length);
        setTrend(taskRate);

      } catch (error) {
        console.log(error)
      }
    }
    if (e === "This Year") {
      try {
        const api = await fetch(`/api/secondGraph/${e}`, {
          method: "POST"
        })
        const data = await api.json()
        console.log(data)
        setChartData(data.pointArray);
        let totalTask = 0;
        for (let i = 0; i < data.pointArray.length; i++) {
          totalTask += data.pointArray[i].Rate;
        }
        setSortMonth(false)
        let taskRate = Math.floor(totalTask / data.pointArray.length);
        setTrend(taskRate);

      } catch (error) {
        console.log(error)
      }
    }
    if (e === "This Week") {
      try {
        const api = await fetch(`/api/secondGraph/${e}`, {
          method: "POST"
        })
        const data = await api.json()
        console.log(data)
        setChartData(data.pointArray);
        let totalTask = 0;
        for (let i = 0; i < data.pointArray.length; i++) {
          totalTask += data.pointArray[i].Rate;
        }
        setSortMonth(false)
        let taskRate = Math.floor(totalTask / data.pointArray.length);
        setTrend(taskRate);

      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    console.log(trend)
  }, [trend])

  return (
    <Card className="bg-black mt-5 w-full text-white  border border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Day Rate Graph
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-black text-white border-zinc-700 hover:bg-white"
              >
                {position}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black text-white border border-zinc-700 shadow-lg">
              <DropdownMenuLabel className="text-zinc-300">Select TimeLine</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-700" />
              <DropdownMenuRadioGroup value={position} onValueChange={(value) => {
                handleValueChange(value)
                setPosition(value)
              }} >
                {["This Week", "This Month", "This Year"].map((e, i) => (
                  <DropdownMenuRadioItem
                    value={e}
                    key={i}
                    className="hover:bg-white/20 "
                  >
                    {e}
                  </DropdownMenuRadioItem>
                ))}

              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription className="text-gray-400"></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid stroke="#333" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tick={chartData.length > 7 ? { angle: -45, fontSize: 9 } : { fontSize: 12 }}
              tickFormatter={sortMonth ? ((value) => value.slice(0, 6)) : ((value) => value.slice(0, 3))}
            />

            <YAxis
              domain={['dataMin', 'dataMax + 1']}
              hide={true}
            />

            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  color={"#ffff"}
                  className=" bg-gray-700  border border-gray-700 "
                />
              }
            />
            <Line
              dataKey="Rate"
              type="monotone"
              stroke="#ffff"
              strokeWidth={2}
              dot={{ fill: "#000" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm text-white">
        <div className="flex gap-2 leading-none font-medium">
          {trend == 0 ? <>No trend is been observed till now</> :
            trend > 0 ? <>Trending up by <span className="text-green-400">{trend}%</span> {position} <TrendingUp className="h-4 w-4 text-green-400" /></> : <>Trending Down by <span className="text-red-400">{trend}%</span> {position} <TrendingDown className="h-4 w-4 text-red-400" /></>
          }
        </div>
        <div className="text-gray-400 leading-none">
          Showing total Task of this {position}
        </div>
      </CardFooter>
    </Card>
  )
}

export default SecondChartTest;
