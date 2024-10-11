import { configureStore } from "@reduxjs/toolkit";
import paasteReducer from './redux/pasteSlice'


export const store = configureStore({
    reducer: {
        paste: paasteReducer,
    },
})