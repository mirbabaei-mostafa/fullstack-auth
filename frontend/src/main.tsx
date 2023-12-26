import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/i18n.ts";
import { HelmetProvider } from "react-helmet-async";
import { CookiesProvider } from "react-cookie";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
