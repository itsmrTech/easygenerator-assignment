// src/pages/SignupPage.tsx

// External Imports
import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

// Internal Imports
import InteractiveBackground from "../components/InteractiveBackground";
import { FormStatusEnum } from "../types/enums";
import { useSignupForm } from "../hooks/useSignupForm";

// Import CSS Styles
import "./signup.page.css";

const SignupPage: React.FC = () => {
  const { formik, error, formStatus } = useSignupForm();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.href = "/app";
    }
  }, []);

  return (
    <Container className="signup-container">
      {/* Background Animation */}
      <InteractiveBackground formStatus={formStatus} />

      {/* Welcome Text */}
      <div className={`welcome-text ${formStatus === FormStatusEnum.Submitted ? "animate" : ""}`}>
        Welcome
      </div>

      {/* Signup Form Card */}
      <Container className="form-container">
        <Card className={`card-auth ${formStatus === FormStatusEnum.Submitted ? "animate" : ""}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Let us know you more
            </Typography>

            {/* Error Alert */}
            {error && <Alert severity="error">{error}</Alert>}

            {/* Signup Form */}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
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
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "20px" }}>
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign-in Link */}
        {formStatus !== FormStatusEnum.Submitted && (
          <a href="/signin" className="undercard-link">
            Already have an account? Sign In
          </a>
        )}
      </Container>
    </Container>
  );
};

export default SignupPage;
