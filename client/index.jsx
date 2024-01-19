import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import data from './../datafile.json'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
        <App data={data}/>
  </React.StrictMode>
);