import { PageHeader } from "@/src/app/admin/_components/pageHeader"
import { Button } from "@/src/components/ui/button"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/src/components/ui/table"
import db from "@/src/db/db"
import Link from "next/link"
import ordersBydayChartsPage from "../statistics/page"

export default function AdminOrdersPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Orders</PageHeader>
            </div>
            <OrdersTable />

        </>
    )
}

async function OrdersTable() {
    //const orders = await db.order.findMany({
    //    include: {
    //        user: true,
    //        product: true,
    //        discountCode: true
    //    }
    //})

    const orders = [
        {
            id: 123,
            product: {
                name: "frango"
            },
            pricePaidInCents: 400,
            discountCode: {
                code: "código"
            },
            createdAt: Date.now()
        }
    ]

    if (orders.length === 0) return <p>No orders Found</p>

    return <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Price Paid</th>
                <th>Discount Code</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.product.name}</td>
                    <td>R${(order.pricePaidInCents / 100).toFixed(2)}</td>
                    <td>{order.discountCode.code}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
            ))}
        </tbody>
    </table>
}