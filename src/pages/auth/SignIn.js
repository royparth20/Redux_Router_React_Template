import React from "react";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
  CircularProgress,
  Box,
  makeStyles,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, login } from "../../store/auth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "calc(100vh - 64px)",
  },
  paper: {
    margin: "auto",
    padding: "1rem",
    maxWidth: "30rem",
  },
}));

function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const authState = useSelector(getAuthState);

  const onSubmit = async (values) => {
    console.log(Date.now());

    const data = await dispatch(
      login({ email: values.email, password: values.password })
    );

    if (data.type === "auth/login/fulfilled") history.push("/");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Helmet title="Sign In" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Formik
          initialValues={{
            email: "superadmin@admin.com",
            password: "superadmin",
            submit: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={onSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              {authState.error && (
                <Alert mt={2} mb={1} severity="warning">
                  {authState.error}
                </Alert>
              )}
              <TextField
                type="email"
                name="email"
                label="Email Address"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                my={1}
                mt={3}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                mt={1}
                mb={5}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={authState.ui.login.loading}
              >
                {authState.ui.login.loading ? (
                  <CircularProgress size="1.8rem" thickness={5} />
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="row">
                <div className="col-12 col-md-6">
                  <Button
                    component={Link}
                    to="/reset-password"
                    fullWidth
                    color="primary"
                  >
                    Forgot password
                  </Button>
                </div>
                <div className="col-12 col-md-6">
                  <Button
                    component={Link}
                    to="/signup"
                    fullWidth
                    color="default"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}

export default SignIn;
