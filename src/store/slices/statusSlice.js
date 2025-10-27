import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
    name: 'status',  
    initialState: {
        message: null,
        code: null
    },  
    reducers: {
        setStatus: (state, action) => {
            state.code = action.payload.code ?? 200
            state.message = action.payload.message ?? null
        },

        setError:(state, action) => {
            state.message = action.payload.message
            state.code = action.payload.code
        },

        clearError: (state) => {
            state.message = null
            state.code = null
        }
    }
})  

export const { setStatus, setError, clearError } = statusSlice.actions
export default statusSlice.reducer