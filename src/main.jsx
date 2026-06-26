import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


// for CSS and UI
import "@mantine/core/styles.css";
import "./styles/App.css"; // has to be after Mantine because of CSS

// Mantine Provider
import { MantineProvider } from "@mantine/core";

// find the HTML element with id="root" from index.html
// React will place the whole app inside this div
ReactDOM.createRoot(document.getElementById("root")).render(
  
  // React.StrictMode helps find possible problems while developing
  // it does not show anything visible on the page
  <React.StrictMode>
    
    <MantineProvider>
      <App />
    </MantineProvider>
  
  </React.StrictMode>
);