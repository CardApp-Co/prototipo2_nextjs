"use client"

import { useEffect, useState } from "react"


const cart_key = "cart"
type CartProduct = {
    id: number,
    amount: number
}

// instruções:
// coloca import {useCart} from "localização desse arquivo"
// dentro da função que retorna o html, pega as funções que você for precisar
// ex: 
// const {cart, addToCart} = useCart()
// const handleAdd = () => {
//    addToCart(5)
//  }
//
//
// <button onClick={handleAdd}> adicionar </button>

export const useCart = () => {
    const [cart, setCart] = useState<CartProduct[]>([]) // isso é pra poder observar o cart com o useEffect. O valor inicial será []
    
    
        useEffect(() => { // essa função roda quando o cartProvider é requisitado. Por isso o []
            const cartJSON = localStorage.getItem(cart_key)
            if (cartJSON) {
                setCart(JSON.parse(cartJSON))
            }
        }, [])
    
        useEffect(() => { // detecta quando o cart altera de valor (mudado com setCart) e atualiza ele no localStorage :O
            localStorage.setItem(cart_key, JSON.stringify(cart))
        }, [cart])
    
        function addToCart(id: number) {
            setCart((currentCart) => {
                var newCart = currentCart.slice()
                
                var alreadyInCart = false

                var cartProduct = newCart.find(cartProduct => cartProduct.id === id)
            
                if (cartProduct) {
                    cartProduct.amount = cartProduct.amount + 1
                    
                } else {
                   newCart.push({
                        id: id,
                        amount: 1
                    }) 
                }
    
                return newCart
            })
        }
    
        function removeFromCart(id :number) {
            setCart((currentCart) => {
                var newCart = currentCart.slice()
                
                var cartProduct = newCart.find(cartProduct => cartProduct.id === id)

                if (cartProduct) {
                    cartProduct.amount -= 1 
                    if (cartProduct.amount < 1) {
                        const index = newCart.findIndex(cartProduct => cartProduct === cartProduct)
                        newCart.splice(index, 1)
                    }
                }
                
                return newCart
    
            })
        }
    
        function clearCart() {
            setCart([])
        }
    return {cart, addToCart, removeFromCart, clearCart}
}

