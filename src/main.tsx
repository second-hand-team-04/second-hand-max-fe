import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import designSystem from "@styles/designSystem.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={designSystem}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
