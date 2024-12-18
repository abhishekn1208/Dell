import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/open-sans";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { store } from "./redux/Store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
