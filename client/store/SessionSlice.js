import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // an array of session objects, each session contain session id, session name, request name and method
    sessions: [],
    isLoaded: false
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        loadSession: (state, action) => {
            state.sessions = [];
            const data = action.payload;
            for (let i = 0; i < data.length; i++) {
                const newSession = {};
                newSession.sessionId = data[i].sessionId;
                newSession.sessionName = data[i].sessionName;
                newSession.requests = [];
                for (let j = 0; j < data[i].requests.length; j++){
                    newSession.requests.push(data[i].requests[j]);
                }
                state.sessions.push(newSession);
            }
            state.isLoaded = true;
        },
    },
});

export const { loadSession } = sessionSlice.actions;

export default sessionSlice.reducer;