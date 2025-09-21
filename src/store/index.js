import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlices"
import toastSlice from "./slices/toastSlice"
import statusSlice from "./slices/statusSlice"
import usersSlice from "./slices/usersSlices"

const store = configureStore({
    reducer:{
        login: loginSlice,
        toast: toastSlice,
        status: statusSlice,
        users: usersSlice,
    }
})

export default store;