import React from "react"; // imports react
import ReactDOM from "react-dom/client"; // to reun react in browser
import App from "./App.jsx"; // main component
import "./index.css"; // tailwind css yha se load hoga
import AppProvider from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
