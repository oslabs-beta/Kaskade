import { configureStore } from "@reduxjs/toolkit";
import overviewReducer from "./OverviewSlice";
import sessionReducer from "./SessionSlice";

export const store = configureStore({
    reducer : {
        overview : overviewReducer,
        session : sessionReducer,
    }
});