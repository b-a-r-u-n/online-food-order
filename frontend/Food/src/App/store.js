import {configureStore} from "@reduxjs/toolkit"
import homeSlice from "../Features/homeSlice";
import  cartSlice  from "../Features/cartSlice";


export const store = configureStore({
    reducer: {
        home: homeSlice,
        cart: cartSlice
    }
});

// export const store = configureStore({
//     reducer: homeSlice
// })