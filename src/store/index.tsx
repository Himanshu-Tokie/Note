import { configureStore } from "@reduxjs/toolkit";
import image from './Image';
import common from "./common";
import firebase from "./firebase";
import theme from "./theme";
export const store = configureStore({
    reducer:{
        common,
        firebase,
        theme,
        image
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware()
})