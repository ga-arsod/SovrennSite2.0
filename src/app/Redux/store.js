const { configureStore } = require("@reduxjs/toolkit");
import authReducer from './Slices/authSlice'
import homeReducer from "./Slices/homeSlice"
import discoveryReducer from "./Slices/discoverySlice"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        home:homeReducer,
        discovery:discoveryReducer
    }
})