import React from "react";
import ReactDOM from "react-dom/client";


import App from "./App";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);

// Note: My main.jsx is the entry point for my React application. It finds the
// root element in my index.html and renders my App component. I
// also use BrowserRouter here so my application can navigate
// between pages."
