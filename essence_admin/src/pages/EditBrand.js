/* eslint-disable camelcase */
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../utils/API';

const EditBrand = () => {
  const navigate = useNavigate();
  const { brand_id } = useParams();
  const [brandData, setBrandData] = useState({});

  const fetchData = async (brand_id) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands/get_brand/${brand_id}`);
      setBrandData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(brand_id);
  }, [brand_id]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div>
            <h1 className="mx-4">Edit Brand</h1>
            <Formik
              enableReinitialize
              initialValues={{
                name: brandData.name ? brandData.name : '',
                image: brandData.image ? brandData.image : '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = '**Sub-Category Name Required';
                } else if (values.name.length < 3) {
                  errors.name = '**Name must be greater then 3 charactors';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('image', values.image);
                formData.append('name', values.name);
                setTimeout(() => {
                  axios
                    .put(`${baseURL}/brands/update_brand/${brand_id}`, formData)
                    .then((res) => navigate('/dashboard/brand'))
                    .catch((error) => console.log(error.message));
                  values.name = '';
                  values.image = '';
                  setSubmitting(false);
                }, 400);
                console.log('va', values);
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
                        label="Brand Name"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <span className="text-danger mx-3">{errors.name && touched.name && errors.name}</span>
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

export default EditBrand;
