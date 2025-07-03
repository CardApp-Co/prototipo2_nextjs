"use client";


import { formatCurrency, formatNumber } from '@/src/lib/formatters';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';


const data = [
    { value: 12, date: 2023 - 1 - 10 },
    { value: 10, date: 2022 - 20 - 10 },
    { value: 13, date: 2022 - 12 - 10 }
]
type RevenueByProductChartProps = {
    data: {
        name: string
        revenue: number


    }[]
};
export function RevenueByProductCharts({data} : RevenueByProductChartProps) {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
        <PieChart width={730} height={250} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Tooltip formatter={value => formatCurrency(value as number)}/>
            <Legend />
            <Pie
            data={data} 
            label = {item => item.name}
            nameKey="name"
            dataKey="revenue" 
            fill="#8884d8" />
        </PieChart>
        </ResponsiveContainer>
    );
}