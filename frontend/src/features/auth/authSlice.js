import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        user: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem('token');
        }
    }
})

export default authSlice.reducer;
export const { setToken, setUser, logout } = authSlice.actions;