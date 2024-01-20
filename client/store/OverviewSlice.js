import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Key: session Id,
    // value: an object containing overview-related information of this session.
    sessions: {},
    // Whether the state has loaded.
    isLoaded: false
}

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
        loadOverview: (state, action) => {
            state.sessions = action.payload;
        },
    },
});

export const { loadOverview } = overviewSlice.actions;

export default overviewSlice.reducer;