import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit'

const toastSlice = createSlice({
    name: 'toast',

    initialState: {toastData: []},  

    reducers:{
        setToast(state, action){
            const dataToast = action.payload.toastData
            dataToast.id = nanoid()
            state.toastData.push(dataToast)
        },

        closeToast(state, action){
            const toastArray = state.toastData.filter(toast => toast.id !== action.payload.id)
            state.toastData = toastArray
        }
    }
})

export const { setToast, closeToast } = toastSlice.actions
export default toastSlice.reducer