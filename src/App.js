import { useEffect, useState } from "react";

import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { getAuthState, persistLogin } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Home from "./pages/Home";
import ProtectedRoute from "./Component/ProtectedRoute";
import Login from "./pages/auth/SignIn";
import Register from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";

import { Box, CircularProgress, Container } from "@material-ui/core";

const routes = [
  { path: "/", component: Home, guard: false },
  { path: "/login", component: Login, guard: false },
  { path: "/signup", component: Register, guard: false },
  { path: "/reset-password", component: ResetPassword, guard: false },
];

function App() {
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(persistLogin());
  });

  if (authState.status === "fetchingFromLocalStore") {
    return (
      <Box width="100vw" height="100vh" display="flex">
        <CircularProgress
          size="2rem"
          thickness={5}
          style={{ margin: "auto" }}
        />
      </Box>
    );
  }

  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <Helmet titleTemplate="%s | Test" defaultTitle="Test Admin Panel" />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Switch>
              {routes.map((route, i) =>
                route.guard ? (
                  <Route exact path={route.path} key={i}>
                    <ProtectedRoute>{<route.component />}</ProtectedRoute>
                  </Route>
                ) : (
                  <Route exact path={route.path} key={i}>
                    {<route.component />}
                  </Route>
                )
              )}
              <Route>
                <Page404 />
              </Route>
            </Switch>
          </MuiPickersUtilsProvider>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
