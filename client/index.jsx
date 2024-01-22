// import App from "./App.jsx";
// import ReactDOM from "react-dom/client";
// import React from "react";
// import data from './../datafile.json'
// import store from './store.js';



// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//         <App store={store}/>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { setData } from './redux/dataSlice';
import data from './../datafile.json';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Dispatch the setData action to populate the initial state with datafile.json
store.dispatch(setData(data));

const root = ReactDOM.createRoot(document.getElementById('root'));
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);