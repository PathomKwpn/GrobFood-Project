import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import InjectTailwind from "./InjectTailwind.tsx";
import Box from "@mui/material/Box";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <InjectTailwind>
      <App />
    </InjectTailwind>
  </>
);
