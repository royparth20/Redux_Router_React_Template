import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const createStore = () =>
  configureStore({
    reducer: reducer,
  });

export default createStore;
