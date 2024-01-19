import { configureStore } from "@reduxjs/toolkit";
import overviewReducer from "./OverviewSlice";

export const store = configureStore({
    reducer : {
        overview : overviewReducer,
    }
});