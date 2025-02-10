import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchedData = createAsyncThunk('fetchedData', async () => {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/getFoodDetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await responce.json();
        return data;
    })


const initialState = {
    foodCatagories: [],
    menuItems: [],
    searchedItem: [],
    isLogIn: false,
    isLoading: true,
    isError: false
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        handaleSearch: (state, action) => { 
            console.log(action.payload);
                       
            if(!action.payload?.trim()){
                alert("Please write Something");
                state.searchedItem = state.menuItems;
            }
            state.searchedItem = state.menuItems.filter((item) => {
                if(item.name.toLowerCase().trim().includes(action.payload.toLowerCase().trim()))
                    return item;
            })                    
        },
        checkLogIn: (state, action) => {
            state.isLogIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchedData.pending, (state, _) => {
            state.isLoading = true;
        })
        builder.addCase(fetchedData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.foodCatagories = action.payload.data.foodCategories;
            state.menuItems = action.payload.data.foodItems;
        })
        builder.addCase(fetchedData.rejected, (state, _) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const {handaleSearch, checkLogIn} = homeSlice.actions;

export default homeSlice.reducer;