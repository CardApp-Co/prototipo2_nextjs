

import { OrdersByDayCharts } from '../_components/Charts/OrdersByDayCharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import db from "@/app/db/db";
import { formatDate } from '@/app/lib/formatters';
import type { Prisma } from "@prisma/client"
import { eachDayOfInterval, interval, startOfDay, subDays } from 'date-fns';
import { ReactNode } from 'react';
import { UsersByDayCharts } from '../_components/Charts/UsersByDayCharts copy';
import { RevenueByProductCharts } from '../_components/Charts/RevenueByProductCharts copy';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';


async function getSalesData(createdAfter: Date | null, createdBefore: Date | null) {

    const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {}

    if (createdAfter) createdAtQuery.gte = createdAfter
    if (createdBefore) createdAtQuery.lte = createdBefore

    const [data, chartData] = await Promise.all([
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
            _count: true
        }),
        db.order.findMany({
            select: { createdAt: true, pricePaidInCents: true },
            where: { createdAt: createdAtQuery },
            orderBy: { createdAt: "asc" },
        })
    ])
    const dayArray = eachDayOfInterval(
        interval(
            createdAfter || startOfDay(chartData[0].createdAt),
            createdBefore || new Date()
        )).map(date => {
            return {
                date: formatDate(date),
                totalSales: 0
            }
        })

    return {
        chartData: chartData.reduce((data, order) => {
            const formattedDate = formatDate(order.createdAt)
            const entry = dayArray.find(day => day.date === formattedDate)
            if (entry == null) return data
            entry.totalSales += order.pricePaidInCents / 100
            return data
        }, dayArray),
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count,
    }
}
async function getUserData(createdAfter: Date | null, createdBefore: Date | null) {
    const createdAtQuery: Prisma.UserWhereInput["createdAt"] = {}

    if (createdAfter) createdAtQuery.gte = createdAfter
    if (createdBefore) createdAtQuery.lte = createdBefore

    const [userCount, orderData, chartData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
        db.user.findMany({
            select: { createdAt: true },
            where: { createdAt: createdAtQuery },
            orderBy: { createdAt: "asc" },
        })
    ])
    const dayArray = eachDayOfInterval(
        interval(
            createdAfter || startOfDay(chartData[0].createdAt),
            createdBefore || new Date()
        )).map(date => {
            return {
                date: formatDate(date),
                totalUsers: 0
            }
        })
    return {
        chartData: chartData.reduce((data, user) => {
            const formattedDate = formatDate(user.createdAt)
            const entry = dayArray.find(day => day.date === formattedDate)
            if (entry == null) return data
            entry.totalUsers += 1
            return data
        }, dayArray),
        userCount,
        averageValuePerUser:
            userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
}

async function getProductData(createdAfter: Date | null, createdBefore: Date | null) {
    const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {}

    if (createdAfter) createdAtQuery.gte = createdAfter
    if (createdBefore) createdAtQuery.lte = createdBefore

    const [activeCount, inactiveCount, chartData] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } }),
        db.product.findMany({
            select: {
                name: true,
                orders: {
                    select: { pricePaidInCents: true },
                    where: { createdAt: createdAtQuery }
                }
            }
        })
    ])
    return {
        chartData: chartData.map(product => {
            return {
                name: product.name,
                revenue: product.orders.reduce((sum, order) => {
                    return sum + order.pricePaidInCents / 100
                }, 0)
            }
        }).filter(product => product.revenue > 0), activeCount, inactiveCount,
    }
}
export default async function ordersBydayChartsPage() {
    const [salesData, usersData, productData] = await Promise.all([
        getSalesData(subDays(new Date(), 7), new Date()),
        getUserData(subDays(new Date(), 7), new Date()),
        getProductData(subDays(new Date(), 7), new Date())
    ])
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                <ChartCard title="Total Sales">
                    <OrdersByDayCharts data={salesData.chartData} />
                </ChartCard>

                <ChartCard title="New Customers">
                    <UsersByDayCharts data={usersData.chartData} />
                </ChartCard>

                <ChartCard title="Revenue By Product">
                    <RevenueByProductCharts data={productData.chartData} />
                </ChartCard>
            </div>


        </>
    )
}
type ChartCardProps = {
    title: string
    children: ReactNode
}

function ChartCard({ title, children }: ChartCardProps) {
    return (
        < Card >
            <CardHeader>
                <div className="flex gap-4 justify-between items-center">
                    <CardTitle>{title}</CardTitle>
                    <DropdownMenu>
                        
                    </DropdownMenu>
                </div>

            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card >
    )
}