import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalPrice: 0,
    isCartVisible: false
}

const totalPrice = (state, _) => {
    state.totalPrice = 0;
    state.cartItems.forEach((item) => {
        state.totalPrice += item.options?.[0]?.[item.size] * item.quantity;
    })
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {            
            const {foodItem, quantity, size} = action.payload;
            let isAvailable = false;
            isAvailable = state.cartItems?.find((item) => {
                if(item._id === foodItem._id){
                    if(item.size !== size)
                        return false;
                    return true;
                }
            })

            if (isAvailable) {
                alert("Already in Cart")
                return;              
            }
            state.cartItems.push({...foodItem, quantity, size});
            totalPrice(state, action);
        },
        handaleQuantity: (state, action) => {
            const {id, num} = action.payload;
            const index = state.cartItems.findIndex((item) => item._id === id)
            state.cartItems[index].quantity += num;
            if(state.cartItems[index].quantity > 10)
                state.cartItems[index].quantity = 10;
            totalPrice(state, action);
        },
        deleteFromCart: (state, action) => {
            const {id, size} = action.payload;
            state.cartItems = state.cartItems.filter((item) => {
                if(item._id !== id)
                    return item;
                else
                    if(item.size !== size)
                        return item;
            })
            totalPrice(state, action);
        },
        cartVisible: (state, action) => {
            state.isCartVisible = action.payload;
        },
        clearCart: (state, _) => {
            state.cartItems = [];
            state.totalPrice = 0;
        }
    }
})

export const {addToCart, cartVisible, handaleQuantity, deleteFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer