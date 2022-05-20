import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { history } from "./components/common/Alert/_helpers";
import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.render(
  <BrowserRouter history={history}>
    <div>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
