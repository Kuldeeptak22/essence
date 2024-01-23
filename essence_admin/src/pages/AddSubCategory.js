import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../utils/API';

const AddSubCategory = () => {
  const [categoryName, setCategoryName] = useState([]);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/categories/get_categories`);
      setCategoryName(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Add Sub-Category</h1>
            <Formik
              initialValues={{ name: '', image: '', description: '', category: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = '**Sub-Category Name Required';
                } else if (values.name.length < 3) {
                  errors.name = '**Name must be greater then 3 charactors';
                }
                if (!values.description) {
                  errors.description = '**Description Required';
                } else if (values.description.length < 10) {
                  errors.name = '**Description must be greater then 10 charactors';
                }
                if (!values.category) {
                  errors.category = '**Category Name Required';
                } else if (values.category.length <= 3) {
                  errors.category = '**Category name must be greater then or equal to 3 charactors';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('image', values.image);
                formData.append('name', values.name);
                formData.append('description', values.description);
                formData.append('category', values.category);
                setTimeout(() => {
                  axios
                    .post(`${baseURL}/subcategories/add_subcategory`, formData)
                    .then((res) => navigate('/dashboard/subCategory'))
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
                        name="name"
                        label="Sub-Category Name"
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
                      <FormControl size="small">
                        <InputLabel id="demo-select-small-label">Category</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={values.category}
                          label="Category Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="category"
                          style={{ width: '400px', margin: '5px' }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {categoryName &&
                            categoryName.map((category) => (
                              <MenuItem value={category._id} key={category._id}>
                                {category.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <span className="text-danger mx-3">{errors.category && touched.category && errors.category}</span>
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

export default AddSubCategory;
