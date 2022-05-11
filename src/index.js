import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import ElderHouseMap from "./Components/Map/ElderHouseMap";
import URLS from "./Constants/urls";
import "./index.css";
import App from "./Pages/App";
import LoginPage from "./Pages/LoginPage";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = URLS.resturl;
axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);
