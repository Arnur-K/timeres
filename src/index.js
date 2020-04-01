import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";

import { firebaseInitApp } from "./store/firebase/firebase";

firebaseInitApp();

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.register();
