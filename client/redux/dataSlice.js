import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { setData, setRunTabData } = dataSlice.actions;
export default dataSlice.reducer;