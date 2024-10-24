// src/pages/SignupPage.tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@mui/material';

const SignupPage = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '', name: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(8, 'Password too short')
        .matches(/[a-zA-Z]/, 'Must contain a letter')
        .matches(/\d/, 'Must contain a number')
        .matches(/[!@#$%^&*]/, 'Must contain a special character')
        .required('Required'),
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Signup values:', values);
      // TODO: Call signup API here
    },
  });

  return (
    <Container>
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
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignupPage;
