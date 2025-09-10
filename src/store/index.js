import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlices"
import toastSlice from "./slices/toastSlice"

const store = configureStore({
    reducer:{
        login: loginSlice,
        toast: toastSlice
    }
})

export default store;