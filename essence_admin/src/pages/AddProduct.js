/* eslint-disable no-plusplus */
/* eslint-disable no-sequences */
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../utils/API';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState([]);
  const [subcategoryName, setSubCategoryName] = useState([]);
  const [brandName, setBrandName] = useState([]);

  const fetchCategory = () => {
    axios
      .get(`${baseURL}/categories/get_categories`)
      .then((res) => setCategoryName(res.data.data))
      .catch((error) => console.log(error.message));
  };
  const fetchSubCategory = () => {
    axios
      .get(`${baseURL}/subcategories/get_subcategories`)
      .then((res) => setSubCategoryName(res.data.data))
      .catch((error) => console.log(error.message));
  };
  const fetchBrand = () => {
    axios
      .get(`${baseURL}/brands/get_brands`)
      .then((res) => setBrandName(res.data.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
    fetchBrand();
  }, []);
  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Add Product</h1>
            <Formik
              initialValues={{
                name: '',
                category: '',
                subcategory: '',
                brand: '',
                quantity: '',
                price: '',
                shortDescription: '',
                description: '',
                thumbnail: '',
                images: [],
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = '**Product Name Required';
                } else if (values.name.length < 3) {
                  errors.name = '**Name must be greater then 3 charactors';
                }
                if (!values.category) {
                  errors.category = '**Category Name Required';
                } else if (values.category.length <= 3) {
                  errors.category = '**Category name must be greater then or equal to 3 charactors';
                }
                if (!values.subcategory) {
                  errors.subcategory = '**Subcategory Name Required';
                } else if (values.subcategory.length <= 3) {
                  errors.subcategory = '**Subcategory name must be greater then or equal to 3 charactors';
                }
                if (!values.brand) {
                  errors.brand = '**Brand Name Required';
                } else if (values.brand.length <= 3) {
                  errors.brand = '**Brand name must be greater then or equal to 3 charactors';
                }
                if (!values.quantity) {
                  errors.quantity = '**Quantity Required';
                } else if (values.name === Number) {
                  errors.quantity = '**Quantity must be in Number';
                }
                if (!values.price) {
                  errors.price = '**Price Required';
                } else if (values.price === Number) {
                  errors.price = '**Price must be in Number';
                }
                if (!values.shortDescription) {
                  errors.shortDescription = '**ShortDescription Required';
                } else if (values.shortDescription.length <= 10) {
                  errors.shortDescription = '**ShortDescription must be greater then or equal to 10 charactors';
                }
                if (!values.description) {
                  errors.description = '**Description Required';
                } else if (values.description.length <= 10) {
                  errors.description = '**Description must be greater then or equal to 10 charactors';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('category', values.category);
                formData.append('subcategory', values.subcategory);
                formData.append('brand', values.brand);
                formData.append('quantity', values.quantity);
                formData.append('price', values.price);
                formData.append('shortDescription', values.shortDescription);
                formData.append('description', values.description);
                formData.append('thumbnail', values.thumbnail);
                for (let i = 0; i < values.images.length; i++) {
                  formData.append('images', values.images[i]);
                }
                setTimeout(() => {
                  axios
                    .post(`${baseURL}/products/add_product`, formData)
                    .then((res) => navigate('/dashboard/products'))
                    .catch((error) => console.log(error.message));
                  values.name = '';
                  values.category = '';
                  values.subcategory = '';
                  values.brand = '';
                  values.quantity = '';
                  values.price = '';
                  values.shortDescription = '';
                  values.description = '';
                  values.thumbnail = '';
                  values.images = [];
                  setSubmitting(false);
                }, 400);
                console.log('values', values);
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
                        label="Product Name"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <span className="text-danger mx-3">{errors.name && touched.name && errors.name}</span>

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

                      <FormControl size="small">
                        <InputLabel id="demo-select-small-label">Sub-Category</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={values.subcategory}
                          label="Sub-Category"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="subcategory"
                          style={{ width: '400px', margin: '5px' }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {subcategoryName &&
                            subcategoryName.map((category) => (
                              <MenuItem value={category._id} key={category._id}>
                                {category.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <span className="text-danger mx-3">
                        {errors.subcategory && touched.subcategory && errors.subcategory}
                      </span>

                      <FormControl size="small">
                        <InputLabel id="demo-select-small-label">Brand</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={values.brand}
                          label="Brand"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="brand"
                          style={{ width: '400px', margin: '5px' }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {brandName &&
                            brandName.map((brand) => (
                              <MenuItem value={brand._id} key={brand._id}>
                                {brand.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <span className="text-danger mx-3">{errors.brand && touched.brand && errors.brand}</span>

                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="number"
                        name="price"
                        label="Price"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                      />
                      <span className="text-danger mx-3">{errors.price && touched.price && errors.price}</span>

                      <TextField
                        size="small"
                        style={{ width: '400px', margin: '5px' }}
                        type="number"
                        name="quantity"
                        label="Quantity"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.quantity}
                      />
                      <span className="text-danger mx-3">{errors.quantity && touched.quantity && errors.quantity}</span>

                      <TextField
                        id="outlined-multiline-flexible"
                        label="Short-Description"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.shortDescription}
                        style={{ width: '400px', margin: '5px' }}
                        name="shortDescription"
                        multiline
                        maxRows={4}
                      />
                      <span className="text-danger mx-3">
                        {errors.shortDescription && touched.shortDescription && errors.shortDescription}
                      </span>

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
                        label="Thumbnail"
                        variant="outlined"
                        name="thumbnail"
                        onChange={(e) => setFieldValue('thumbnail', e.target.files[0])}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        style={{ width: '400px', margin: '5px' }}
                        type="file"
                        label="Images"
                        variant="outlined"
                        name="images"
                        onChange={(e) => setFieldValue('images', e.target.files)}
                        onBlur={handleBlur}
                        multiple
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          multiple: true,
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

export default AddProduct;
