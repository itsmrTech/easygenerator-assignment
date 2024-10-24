// src/hooks/useSigninForm.ts
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as authService from "../services/auth.service";
import { FormStatusEnum } from "../types/enums";

export const useSigninForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatusEnum>(
    FormStatusEnum.Idle
  );

  const navigateToApp = () => {
    setTimeout(() => {
      window.location.href = "/app";
    }, 7000);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password too short")
      .matches(/[a-zA-Z]/, "Must contain a letter")
      .matches(/\d/, "Must contain a number")
      .matches(/[!@#$%^&*]/, "Must contain a special character")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setFormStatus(FormStatusEnum.Submitting);
      setError(null);

      try {
        const response = await authService.signin(values.email, values.password);
        console.log("Signin response:", response);
        setFormStatus(FormStatusEnum.Submitted);
        navigateToApp();
      } catch (err) {
        console.error("Signin error:", err);
        setFormStatus(FormStatusEnum.Error);
        setError((err as any)?.response?.data?.message || "An error occurred");
      }
    },
  });

  return { formik, error, formStatus };
};
