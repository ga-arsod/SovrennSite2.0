const { configureStore } = require("@reduxjs/toolkit");
import authReducer from './Slices/authSlice'
import homeReducer from "./Slices/homeSlice"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        home:homeReducer,
    }
})