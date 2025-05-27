"use client";

import { OrdersByDayCharts } from '../_components/Charts/OrdersByDayCharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { Prisma } from "@prisma/client"
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

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count,
    }
}
async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ])
}
export default function ordersBydayChartsPage() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrdersByDayCharts data={[{ date: "blsvls", totalSales: 12 }, { date: "okok", totalSales: 10 }]} />
                    </CardContent>
                </Card>
            </div>


        </>
    )
}