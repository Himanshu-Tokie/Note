import { configureStore } from "@reduxjs/toolkit";
import common from "./common";
import firebase from "./firebase";

export const store = configureStore({
    reducer:{
        common,
        firebase
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware()
})