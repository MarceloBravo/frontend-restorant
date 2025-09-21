import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users
        },

        setUser: (state, action) => {
            state.user = action.payload.user
        }

    }
})

export const { setUsers, setUser } = usersSlice.actions
export default usersSlice.reducer;