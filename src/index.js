import "./index.css";

import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import history from "./utils/history";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
