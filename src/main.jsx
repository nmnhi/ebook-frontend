import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { createRoot } from "react-dom/client";
import "../src/styles/main.css";
import App from "./app/App";
import AppProviders from "./app/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>
);
