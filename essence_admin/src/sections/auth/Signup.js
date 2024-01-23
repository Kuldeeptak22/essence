import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { Formik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Iconify from '../../components/iconify/Iconify';
import { baseURL } from '../../utils/API';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '', contact: '', role: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = '**First Name Required';
            } else if (values.firstName.length < 3) {
              errors.firstName = '**First Name should be greater then or equal to 3 characters';
            }
            if (!values.lastName) {
              errors.lastName = '**Last Name Required';
            } else if (values.lastName.length < 3) {
              errors.lastName = '**Last Name should be greater then or equal to 3 characters';
            }
            if (!values.email) {
              errors.email = '**Email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = '**Password required';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/i.test(values.password)) {
              errors.password = 'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 ';
            }
            if (!values.contact) {
              errors.contact = '**Contact Required..!';
            } else if (!/^\d{10}$$/i.test(values.contact)) {
              errors.contact = '**Number charecter should be 10 Digit..!';
            }
            if (!values.role) {
              errors.role = '**Role Required..!';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              axios
                .post(`${baseURL}/employees/sign_up_Employee`, values)
                .then((res) => {
                  const notify = () => toast.success(res.data.message);
                  notify();
                  setTimeout(() => {
                    navigate('/login');
                  }, 1000);
                })
                .catch((res) => {
                  const notify = () =>
                    toast.error(res.response.data.message, {
                      position: 'top-center',
                    });
                  notify();
                });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <TextField
                  type="text"
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <span className="text-danger">{errors.firstName && touched.firstName && errors.firstName}</span>
                <TextField
                  type="text"
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <span className="text-danger">{errors.lastName && touched.lastName && errors.lastName}</span>
                <TextField
                  type="email"
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className="text-danger">{errors.email && touched.email && errors.email}</span>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="text-danger">{errors.password && touched.password && errors.password}</span>

                <TextField
                  type="Number"
                  label="Contact"
                  name="contact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                />
                <span className="text-danger">{errors.contact && touched.contact && errors.contact}</span>

                <TextField
                  type="text"
                  label="Role"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                />
                <span className="text-danger">{errors.role && touched.role && errors.role}</span>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
                  Sign up
                </LoadingButton>

                <ToastContainer />
              </Stack>
            </form>
          )}
        </Formik>
      </Stack>
    </>
  );
}
