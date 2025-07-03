"use client";


import { formatNumber } from '@/src/lib/formatters';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';


const data = [
    { value: 12, date: 2023 - 1 - 10 },
    { value: 10, date: 2022 - 20 - 10 },
    { value: 13, date: 2022 - 12 - 10 }
]
type UsersByDayChartProps = {
    data: {
        date: string
        totalUsers: number


    }[]
};
export function UsersByDayCharts({data} : UsersByDayChartProps) {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
        <BarChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="hsl(var(--muted))" />
            <XAxis dataKey="date" />
            <YAxis  tickFormatter={tick => formatNumber(tick)}/>
            <Tooltip formatter={value => formatNumber(value as number)}/>
            <Legend />
            <Bar  dataKey="totalUsers" name="New Customers"stroke="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
    );
}