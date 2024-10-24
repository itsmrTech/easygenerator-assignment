// src/pages/SigninPage.tsx

// External Imports
import { Container, Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import React, { useEffect } from "react";

// Internal Imports
import InteractiveBackground from "../components/InteractiveBackground";
import { useSigninForm } from "../hooks/useSigninForm";
import { FormStatusEnum } from "../types/enums";

// Import CSS Styles
import "./signin.page.css";

const SigninPage: React.FC = () => {
  const { formik, error, formStatus } = useSigninForm();

  // Redirect to /app if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.href = "/app";
    }
  }, []);

  return (
    <Container className="signin-container">
      {/* Background Animation */}
      <InteractiveBackground formStatus={formStatus} />

      {/* Welcome Text with Conditional Animation */}
      <div className={`welcome-text ${formStatus === FormStatusEnum.Submitted ? "animate" : ""}`}>
        Welcome Back
      </div>

      {/* Form Container */}
      <Container className="form-container">
        <Card className={`card-auth ${formStatus === FormStatusEnum.Submitted ? "animate" : ""}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sign In to Your Account
            </Typography>

            {/* Error Message if any */}
            {error && <Alert severity="error">{error}</Alert>}

            {/* Formik Form */}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Signup Link */}
        {formStatus!==FormStatusEnum.Submitted?<a href="/signup" className="undercard-link">
          Don't have an account? Sign up
        </a>:null}
      </Container>
    </Container>
  );
};

export default SigninPage;
