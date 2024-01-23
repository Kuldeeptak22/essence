import React from 'react';
import axios from 'axios';
import { Box, Button, Paper, TextField } from '@mui/material';
import { Formik } from 'formik';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { baseURL } from '../utils/API';

const AddUser = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Add User</h1>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                contact: '',
                dob: '',
                role: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.firstName) {
                  errors.firstName = '**First Name Required';
                }
                if (!values.lastName) {
                  errors.lastName = '**Last Name Required';
                }
                if (!values.email) {
                  errors.email = '**Email Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = '**Invalid email address';
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
                if (!values.dob) {
                  errors.dob = '**Date Required..!';
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
                    .then((res) => navigate('/dashboard/user'))
                    .catch((error) => console.log(error.message));
                  values.firstName = '';
                  values.lastName = '';
                  values.email = '';
                  values.password = '';
                  values.contact = '';
                  values.dob = '';
                  values.role = '';
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
                <Box>
                  <Paper elevation={3}>
                    <form onSubmit={handleSubmit} className="d-flex flex-column p-5">
                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="text"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />

                      <span className="text-danger mx-3">
                        {errors.firstName && touched.firstName && errors.firstName}
                      </span>
                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="text"
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className={errors.lastName ? 'is-invalid' : ''}
                      />
                      <span className="text-danger mx-3">{errors.lastName && touched.lastName && errors.lastName}</span>
                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="text"
                        label="Email Address"
                        variant="outlined"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <span className="text-danger mx-3">{errors.email && touched.email && errors.email}</span>
                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="password"
                        label="Password"
                        variant="outlined"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <span className="text-danger mx-3">{errors.password && touched.password && errors.password}</span>

                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="number"
                        label="Contact"
                        variant="outlined"
                        name="contact"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact}
                      />
                      <span className="text-danger mx-3"> {errors.contact && touched.contact && errors.contact}</span>

                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="date"
                        label="Date of Birth"
                        variant="outlined"
                        name="dob"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dob}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <span className="text-danger mx-3"> {errors.date && touched.date && errors.date}</span>

                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="text"
                        label="Role"
                        variant="outlined"
                        name="role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role}
                      />
                      <span className="text-danger mx-3"> {errors.role && touched.role && errors.role}</span>

                      <Button
                        sx={{ width: { md: '100px' }, margin: '10px 0px' }}
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </form>
                  </Paper>
                </Box>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddUser;
