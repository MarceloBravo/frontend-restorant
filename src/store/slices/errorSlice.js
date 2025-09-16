import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
    name: 'error',  
    initialState: {
        message: null,
        code: null
    },  
    reducers: {
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

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer