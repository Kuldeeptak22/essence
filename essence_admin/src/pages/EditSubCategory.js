/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../utils/API';

const EditSubCategory = () => {
  const navigate = useNavigate();
  const { subcategory_id } = useParams();
  const [categoryName, setCategoryName] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState({});

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/categories/get_categories`);
      setCategoryName(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategoryData = async (subcategory_id) => {
    try {
      // eslint-disable-next-line camelcase
      const { data } = await axios.get(`${baseURL}/subcategories/get_subcategory/${subcategory_id}`);
      setSubCategoryData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategoryData(subcategory_id);
  }, [subcategory_id]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Edit Sub-Category</h1>
            <Formik
              enableReinitialize
              initialValues={{
                name: subCategoryData.name ? subCategoryData.name : '',
                image: subCategoryData.image ? subCategoryData.image : '',
                description: subCategoryData.description ? subCategoryData.description : '',
                category: subCategoryData.category ? subCategoryData.category : '',
              }}
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
                    .put(`${baseURL}/subcategories/update_subcategory/${subcategory_id}`, formData)
                    .then((res) => navigate('/dashboard/subCategory'))
                    .catch((error) => console.log(error.message));
                  values.name = '';
                  values.description = '';
                  values.image = '';
                  values.category = '';
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
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                            categoryName.map((cate) => (
                              <MenuItem value={cate._id} key={cate._id}>
                                {cate.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <span className="text-danger mx-3">{errors.category && touched.category && errors.category}</span>

                      <Button sx={{ width: { md: '100px' } }} type="submit" variant="contained" disabled={isSubmitting}>
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

export default EditSubCategory;
