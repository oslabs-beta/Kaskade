import { createSlice } from '@reduxjs/toolkit';
import { flushSync } from 'react-dom';

const initialState = {
  data: [], // Initial state that'll be updated to action payload (datafile)
};

const dataSlice = createSlice({
  name: 'datafile',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.datafile = action.payload;
    },
    setRunTabData: (state, action) => {
      const { servers, testDuration, concurrentUsers, numOfWorkers } = action.payload;
      // Check if data is already initialized
      if (!state.datafile) {
        state.datafile = [];
      }
      // Havent quite worked out how discerning props from multiple session in datafile yet
      if (state.datafile.length > 0) {
        const updatedData = {
          ...state.data[0],
          servers: servers ? [servers] : state.datafile[0].servers,
          testDuration: testDuration !== undefined ? testDuration : state.datafile[0].testDuration,
          concurrentUsers: concurrentUsers !== undefined ? concurrentUsers : state.datafile[0].concurrentUsers,
          numOfWorkers: numOfWorkers !== undefined ? numOfWorkers : state.datafile[0].numOfWorkers,
        };
        state.datafile[0] = updatedData;
      }
    },
    currentSessionConfig: (state, action) => {
      state.configFile = action.payload
    },
    createSession: (state, action) => {
      const newSession = {};
      newSession.sessionId = Date.now();
      newSession.sessionName = "New Session";
      newSession.requests = [];
      newSession.createdOn = newSession.sessionId;
      newSession.lastModified = newSession.sessionId;
      state.datafile.push(newSession);
    
      // call main process to write data file
      window.electronAPI.writeDataFile(JSON.stringify(state.datafile));
    },
    addRequest: (state, action) => {
      const sessionId = action.payload;
      const newRequest = {};
      newRequest.requestId = Date.now();
      newRequest.requestName = "New Request";
      for (let i = 0; i < state.datafile.length; i++) {
        if (state.datafile[i].sessionId == sessionId) {
          state.datafile[i].requests.push(newRequest);
        }
      }
      // call main process to write data file
      window.electronAPI.writeDataFile(JSON.stringify(state.datafile));
    },
    duplicateSession: (state, action) => {
      const oldSession = action.payload;
      const newSession = JSON.parse(JSON.stringify(oldSession));
      newSession.sessionId = Date.now();
      newSession.sessionName = "Copy of " + newSession.sessionName ;
      newSession.createdOn = newSession.sessionId;
      newSession.lastModified = newSession.sessionId;
      state.datafile.push(newSession);
    
      // call main process to write data file
      window.electronAPI.writeDataFile(JSON.stringify(state.datafile));
    },
    deleteSession: (state, action) => {
      const sessionId = action.payload;
      for (let i = 0; i < state.datafile.length; i++) {
        if (state.datafile[i].sessionId == sessionId) {
          state.datafile.splice(i, 1);
        }
      }
    
      // call main process to write data file
      window.electronAPI.writeDataFile(JSON.stringify(state.datafile));
    },

    // For presentation purpose only (delete after presentation 01/25/2024, also setDemoData on 55)
    setDemoData: (state, action) => {
      state.demo = action.payload;
    },
  },
});

export const { setData, setRunTabData, currentSessionConfig, createSession, setDemoData, addRequest, duplicateSession, deleteSession  } = dataSlice.actions;
export default dataSlice.reducer;