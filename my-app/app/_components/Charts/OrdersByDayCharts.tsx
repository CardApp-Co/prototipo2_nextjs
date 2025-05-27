"use client";


import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    { value: 12, date: 2023 - 1 - 10 },
    { value: 10, date: 2022 - 20 - 10 },
    { value: 13, date: 2022 - 12 - 10 }
]
type OrdersByDayChartProps = {
    data: {
        date: string
        totalSales: number


    }[]
};
export function OrdersByDayCharts({data} : OrdersByDayChartProps) {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="hsl(var(--muted))" />
            <XAxis dataKey="date" />
            <YAxis  />
            <Tooltip />
            <Legend />
            <Line dot={false} type="monotone" dataKey="totalSales" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
    );
}