import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(8, 24, 18, 0.86)",
            color: "#f1fff7",
            border: "1px solid rgba(101, 246, 167, 0.24)",
            backdropFilter: "blur(18px)"
          }
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
