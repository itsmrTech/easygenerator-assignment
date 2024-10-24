// src/hooks/useSignupForm.ts
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as authService from "../services/auth.service";
import { FormStatusEnum } from "../types/enums";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password too short")
    .matches(/[a-zA-Z]/, "Must contain a letter")
    .matches(/\d/, "Must contain a number")
    .matches(/[!@#$%^&*]/, "Must contain a special character")
    .required("Required"),
  name: Yup.string().required("Required"),
});

const INITIAL_VALUES = { email: "", password: "", name: "" };

export const useSignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatusEnum>(
    FormStatusEnum.Idle
  );

  const navigateToApp = () => {
    setTimeout(() => {
      window.location.href = "/app"; // Navigate after a delay
    }, 7000);
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: async (values) => {
      setFormStatus(FormStatusEnum.Submitting);
      setError(null);

      try {
        const response = await authService.signup(
          values.email,
          values.password,
          values.name
        );
        console.log("Signup response:", response);
        setFormStatus(FormStatusEnum.Submitted);
        navigateToApp();
      } catch (err: any) {
        console.error("Signup error:", err);
        setFormStatus(FormStatusEnum.Error);
        setError(err?.response?.data?.message || "An error occurred");
      }
    },
  });

  return { formik, error, formStatus };
};
