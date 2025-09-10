import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',

    initialState: { token: null, refreshToken: null, isLogged: false },  

    reducers:{
        login(state, action){
            state.token = action.payload.access
            state.refreshToken = action.payload.refresh
            state.isLogged = true
        },

        logOut: (state) => {
            state.token = null
            state.refreshToken = null
            state.isLogged = false
        }

    }
})

export const { login, logOut } = loginSlice.actions
export default loginSlice.reducer