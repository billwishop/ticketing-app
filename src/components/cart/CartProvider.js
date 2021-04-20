import React, {useState} from 'react'

export const CartContext = React.createContext()

export const CartProvider = props => {
    const [cart, setCart] = useState([])
    const [cartLength, setCartLength] = useState(0)

    return (
        <CartContext.Provider value={
            {
                cart, setCart, cartLength, setCartLength
            }
        }>
            {props.children}
        </CartContext.Provider>
    )
}



