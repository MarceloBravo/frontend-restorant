import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',

    initialState: {toastData: []},  

    reducers:{
        toast(state, action){
            state.toastData.push(...action.payload.toastData)
        },

        closeToast(state, action){
            console.log(action.payload.id)
            const toastArray = state.toastData.filter(toast => toast.id !== action.payload.id)
            state.toastData = toastArray
        }
    }
})

export const { toast, closeToast } = toastSlice.actions
export default toastSlice.reducer