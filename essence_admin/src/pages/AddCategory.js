import { Box, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../utils/API';

const AddCategory = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Add Category</h1>
            <Formik
              initialValues={{ name: '', image: '', description: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = '**Category Name Required';
                } else if (values.name.length < 3) {
                  errors.name = '**Name must be greater then 3 charactors';
                }
                if (!values.description) {
                  errors.description = '**Description Required';
                } else if (values.description.length < 10) {
                  errors.name = '**Description must be greater then 10 charactors';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('image', values.image);
                formData.append('name', values.name);
                formData.append('description', values.description);
                setTimeout(() => {
                  axios
                    .post(`${baseURL}/categories/add_category`, formData)
                    .then((res) => navigate('/dashboard/category'))
                    .catch((error) => console.log(error.message));
                  values.name = '';
                  values.description = '';
                  values.image = '';
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
                setFieldValue,
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
                        name="name"
                        label="Category Name"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <span className="text-danger mx-3">{errors.name && touched.name && errors.name}</span>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        style={{ width: '400px', margin: '5px' }}
                        name="description"
                        multiline
                        maxRows={4}
                      />
                      <span className="text-danger mx-3">
                        {errors.description && touched.description && errors.description}
                      </span>
                      <TextField
                        style={{ width: '400px', margin: '5px' }}
                        type="file"
                        label="image"
                        variant="outlined"
                        name="image"
                        onChange={(e) => setFieldValue('image', e.target.files[0])}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Button sx={{ width: { md: '100px' } }} type="submit" variant="contained" disabled={isSubmitting}>
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

export default AddCategory;
