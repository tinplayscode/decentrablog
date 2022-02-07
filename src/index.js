import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initContract } from "./utils";
import { HashRouter as BrowserRouter } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <ToastContainer
          theme="dark"
          transition={Flip}
          autoClose="5000"
          position="top-center"
        />
        <App />
      </BrowserRouter>,
      document.querySelector("#root")
    );
  })
  .catch(console.error);
