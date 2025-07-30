"use client"

const { useCart, CartProduct } = require("../../../cartMemory")

export default function cartClientComponent() {
    const { cart } = useCart()

    if (cart.length == 0) {
        return <p> Não há nenhum item no carrinho </p>
    } else {
        return <ul className="space-y-2">
            {cart.map((item: typeof CartProduct) => (
                <li key={item.id} className="border p-2 rounded">
                    Produto ID: {item.id} — Quantidade: {item.amount}
                </li>
            ))}
        </ul>
    }
}