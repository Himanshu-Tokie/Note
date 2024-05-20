import { configureStore } from "@reduxjs/toolkit";
import common from "./common";
import firebase from "./firebase";
import theme from "./theme";
export const store = configureStore({
    reducer:{
        common,
        firebase,
        theme
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware()
})