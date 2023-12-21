import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/i18n.ts";
import { HelmetProvider } from "react-helmet-async";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CookiesProvider>
  </React.StrictMode>
);
