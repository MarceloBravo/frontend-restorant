import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',

    initialState: { 
        access: null, 
        refresh: null, 
        isLogged: undefined,

        id: null,
        date_joined: null,
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        is_active: null,
        is_staff: null,
    },  

    reducers:{
        login(state, action){
            state.access = action.payload.access
            state.refresh = action.payload.refresh
            state.isLogged = true
        },

        logOut: (state) => {
            state.access = null
            state.refresh = null
            state.isLogged = false

            state.id = null
            state.date_joined = null
            state.username = null
            state.email = null
            state.first_name = null
            state.last_name = null
            state.is_active = null
            state.is_staff = null
        },

        setUserData: (state, action) => {
            state.id = action.payload.id
            state.date_joined = action.payload.date_joined
            state.username = action.payload.username
            state.email = action.payload.email
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.is_active = action.payload.is_active
            state.is_staff = action.payload.is_staff
        }

    }
})

export const { login, logOut, setUserData } = loginSlice.actions
export default loginSlice.reducer