import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createStore from "./store";
import addAuthTokenInterceptor from "./api/addAuthTokenInterceptor";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/bootstrap.min.css';




const store = createStore();

addAuthTokenInterceptor(store);

const AppWithStore = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

ReactDOM.render(
  <BrowserRouter>
    <AppWithStore />
  </BrowserRouter>,
  document.getElementById("root")
);
