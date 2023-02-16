import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProjectContextProvider } from "./context/ProjectContext";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectContextProvider>
        <App />
      </ProjectContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
