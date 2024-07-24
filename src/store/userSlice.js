import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increase(state, action) {
            const {id, amount} = action.payload;
            const item = state.find((item) => item.id === id);
            if (item) {
                item.count += amount;
            }
        },
        addItem(state, action){
            const items = action.payload
            console.log('불러온', items)
            state.push(items)
        },   
    }
});

export const { increase, addItem } = userSlice.actions;
export default userSlice.reducer;
