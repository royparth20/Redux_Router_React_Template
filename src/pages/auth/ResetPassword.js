import React from "react";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Button,
  makeStyles,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

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

function ResetPassword() {
  // const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Helmet title="Reset Password" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Enter your email to reset your password
        </Typography>

        <Formik
          initialValues={{
            email: "",
            submit: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              // await dispatch(
              //   resetPassword({
              //     email: values.email,
              //   })
              // );
              history.push("/auth/sign-in");
            } catch (error) {
              const message = error.message || "Something went wrong";

              setStatus({ success: false });
              setErrors({ submit: message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              {errors.submit && (
                <Alert mt={2} mb={1} severity="warning">
                  {errors.submit}
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
                my={3}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Reset password
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}

export default ResetPassword;
