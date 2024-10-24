// src/pages/SigninPage.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import { useState } from "react";
import * as authService from "../services/authService";
import { FormStatusEnum } from "../types/enums";
import InteractiveBackground from "../components/InteractiveBackground";

const SigninPage = () => {
    const [formStatus, setFormStatus] = useState<FormStatusEnum>(FormStatusEnum.Idle);
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
                .min(8, "Password too short")
                .matches(/[a-zA-Z]/, "Must contain a letter")
                .matches(/\d/, "Must contain a number")
                .matches(/[!@#$%^&*]/, "Must contain a special character")
                .required("Required"),
        }),
        onSubmit: (values) => {
            console.log("Signin values:", values);
            setFormStatus(FormStatusEnum.Submitting);
            authService.signin(values.email, values.password).then((res) => {
                console.log("Signin response:", res);
                setFormStatus(FormStatusEnum.Submitted);
                setTimeout(() => {
                    window.location.href = "/app";
                }, 7000);
            }).catch((err) => {
                console.log("Signin error:", err);
                setFormStatus(FormStatusEnum.Error);
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
            <InteractiveBackground formStatus={formStatus} />
            <div className={`welcome-text ${formStatus === FormStatusEnum.Submitted ? "animate" : ""}`}>Welcome Back</div>
            <Card sx={{ maxWidth: 345, zIndex: 100 }} className={`card-auth ${formStatus === FormStatusEnum.Submitted ? "animate" : ""}`}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Sign In to Your Account
                    </Typography>
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
                        <Button type="submit" variant="contained" color="primary">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default SigninPage;
