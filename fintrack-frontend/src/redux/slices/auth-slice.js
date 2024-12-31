import {createSlice} from '@reduxjs/toolkit';

const authInitialState = {
    value: {
        isAuthenticated: false,
        username: "",
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        logOut: (state, action) => {
            return authInitialState;
        },
        logIn: (state, action) => {
            return {
                value:{
                    isAuthenticated: true,
                    username: action.payload
                }
            };
        },
    }
})

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;