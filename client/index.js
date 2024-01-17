import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
// import { Provider } from 'react-redux';
// import {store} from "./store/store.js"

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
    <StrictMode>
      {/* <Provider store={store}> */}
       <App />
       {/* </Provider> */}
     </StrictMode>
  );