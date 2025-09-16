import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlices"
import toastSlice from "./slices/toastSlice"
import errorSlice from "./slices/errorSlice"
import usersSlice from "./slices/usersSlices"

const store = configureStore({
    reducer:{
        login: loginSlice,
        toast: toastSlice,
        error: errorSlice,
        users: usersSlice,
    }
})

export default store;