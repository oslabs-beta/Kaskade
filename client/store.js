import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
      games: gamesReducer,
      auth: authReducer,
    },
  })

  export default store;
