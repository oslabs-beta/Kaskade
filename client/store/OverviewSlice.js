import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Key: session Id,
    // value: an object containing overview-related information of this session.
    sessions: {
        "1" : {
            name: "Login, browse and checkout",
            overview: "This session simulates a user that logs in to our website. \
                The user then performs some browsing activities over the category pages and product detail pages. \
                Finally, the user adds a product item into the shopping cart, and checks out.\n \
                This session involves a mix of GET and POST requests, and is considered a core user flow of our website.\n\
                In production, we see about 12% of user sessions follow this pattern.",
            createBy: "Alice",
            createdOn: "05 Jan 2024 8:33 PM",
            lastModified: "17 Jan 2024 8:15 PM"
        }
    },
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