// src/pages/SignupPage.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as authService from "../services/authService";
import { FormStatusEnum } from "../types/enums";
import InteractiveBackground from "../components/InteractiveBackground";

const SignupPage = () => {
    useEffect(() => {

        // check if user is already logged in
        if(localStorage.getItem("accessToken")) {
            window.location.href = "/app";
        }
    },[])
    const [error, setError] = useState<string|null>(null);

  const [formStatus, setFormStatus] = useState<FormStatusEnum>(FormStatusEnum.Idle);
  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Password too short")
        .matches(/[a-zA-Z]/, "Must contain a letter")
        .matches(/\d/, "Must contain a number")
        .matches(/[!@#$%^&*]/, "Must contain a special character")
        .required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Signup values:", values);
        setFormStatus(FormStatusEnum.Submitting)
        setError(null);
        authService.signup(values.email, values.password, values.name).then((res)=>{
            console.log("Signup response:", res);
            setFormStatus(FormStatusEnum.Submitted)
            setTimeout(()=>{
                window.location.href = "/app";
            },7000)
        }).catch((err)=>{
            console.log("Signup error:", err);
            setFormStatus(FormStatusEnum.Error);
            setError(err?.response?.data?.message || "An error occurred");
        });
        
    },
  });


  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <InteractiveBackground formStatus={formStatus}/>
    <div className={`welcome-text ${formStatus===FormStatusEnum.Submitted?"animate":""}`}>Welcome </div>
      <Container sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                zIndex: 100,
            }}>
      <Card sx={{ maxWidth: 345, zIndex: 100 }} className={`card-auth ${formStatus===FormStatusEnum.Submitted?"animate":""}`}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Let us know you more
          </Typography>
          {error?<Alert variant="standard" severity="error">
            {error}
            </Alert>:null}
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
            <Button sx={{marginTop:"20px"}} type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <a href="/signin" className="undercard-link">
        Already have an account? Sign In
            </a></Container>
    </Container>
  );
};

export default SignupPage;
