/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../utils/API';

const EditUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  // eslint-disable-next-line camelcase
  const { user_id } = useParams();

  // eslint-disable-next-line camelcase
  const fetchData = async (user_id) => {
    try {
      // eslint-disable-next-line camelcase
      const { data } = await axios.get(`${baseURL}/employees/get_employee/${user_id}`);
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(user_id);
    // eslint-disable-next-line camelcase
  }, [user_id]);

  if (!userData) {
    // Render a loading indicator here if needed
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Edit User</h1>
            <Formik
              enableReinitialize
              initialValues={{
                // eslint-disable-next-line object-shorthand
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                contact: userData.contact,
                gender: userData.gender ? userData.gender : '',
                avatar: userData.avatar ? userData.avatar : null,
                about: userData.about ? userData.about : '',
                dob: userData.dob ? userData.dob : '',
                role: userData.role ? userData.role : '',
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
                const formData = new FormData();
                formData.append('avatar', values.avatar);
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('email', values.email);
                formData.append('contact', values.contact);
                formData.append('gender', values.gender);
                formData.append('about', values.about);
                formData.append('dob', values.dob);
                formData.append('role', values.role);
                setTimeout(() => {
                  axios
                    // eslint-disable-next-line camelcase
                    .put(`${baseURL}/employees/update_employee/${user_id}`, formData)
                    .then((res) => {
                      axios.get(`${baseURL}/employees/get_employee/${user_id}`).then((res) => {
                        const UserDetails = JSON.parse(localStorage.getItem('Employee'));
                        console.log('uu', UserDetails._id);
                        if (UserDetails._id === user_id) {
                          localStorage.setItem('Employee', JSON.stringify(res.data.data));
                          const event = new Event('employeeUpdated');
                          window.dispatchEvent(event);
                        }
                        navigate('/dashboard/user');
                      });
                    })
                    .catch((error) => console.log(error.message));

                  values.firstName = '';
                  values.lastName = '';
                  values.email = '';
                  values.contact = '';
                  values.gender = '';
                  values.avatar = '';
                  values.about = '';
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
                setFieldValue,
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
                        value={values.firstName || ''}
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <span className="text-danger mx-3">{errors.email && touched.email && errors.email}</span>

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
                        type="number"
                        label="Contact"
                        variant="outlined"
                        name="contact"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <span className="text-danger mx-3"> {errors.contact && touched.contact && errors.contact}</span>
                      <FormControl size="small">
                        <InputLabel id="demo-select-small-label">Gender</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={values.gender}
                          label="Gender"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="gender"
                          style={{ width: '400px', margin: '5px' }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'male'}>Male</MenuItem>
                          <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        style={{ width: '400px', margin: '5px' }}
                        type="file"
                        label="Avatar"
                        variant="outlined"
                        name="avatar"
                        onChange={(e) => setFieldValue('avatar', e.target.files[0])}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        id="outlined-multiline-flexible"
                        label="About User"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.about}
                        style={{ width: '400px', margin: '5px' }}
                        name="about"
                        multiline
                        maxRows={4}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

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
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <span className="text-danger mx-3"> {errors.role && touched.role && errors.role}</span>

                      <Button
                        sx={{ width: { md: '100px' }, margin: '10px 0px' }}
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        Update
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

export default EditUser;
