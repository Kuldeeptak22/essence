import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Modal, Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { Formik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Iconify from '../../../components/iconify';
import { baseURL } from '../../../utils/API';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 340,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [hideSendOtp, sethideSendOtp] = useState(true);
  const [hideSendEmail, sethideSendEmail] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const handleOpenChangePassModel = () => {
    setOpenChangePassModel(true);
  };
  const handleCloseChangePassModel = () => setOpenChangePassModel(false);

  const [userId, setUserId] = useState('');

  return (
    <>
      <Stack spacing={2}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
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
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              axios
                .post(`${baseURL}/employees/sign_in_Employee`, values)
                .then((res) => {
                  if (res && res.data && res.data.message && res.data.token && res.data.data !== undefined) {
                    const notify = () => toast.success(res.data.message);
                    localStorage.setItem('EmployeeToken', JSON.stringify(res.data.token));
                    localStorage.setItem('Employee', JSON.stringify(res.data.data));
                    notify();
                    setTimeout(() => {
                      navigate('/dashboard/app');
                    }, 1000);
                  }
                })
                .catch((error) => {
                  if (error.response) {
                    const notify = () =>
                      toast.error(error.response.data.message, {
                        position: 'top-center',
                      });
                    notify();
                  }
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
              <Stack spacing={2}>
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

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                  <Link sx={{ cursor: 'pointer' }} variant="subtitle2" underline="hover" onClick={handleOpen}>
                    Forgot password?
                  </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
                  Login
                </LoadingButton>

                <ToastContainer />
              </Stack>

              {/* ============ Forget Password Modal ========= */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-3">
                    Registered Email:
                  </Typography>
                  {/* SEND OTP FORM */}
                  {hideSendOtp && (
                    <Formik
                      initialValues={{ email: '' }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = '**Email Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                          errors.email = 'Invalid email address';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        const notify = () => toast('Please wait for a while...');
                        notify();
                        setTimeout(() => {
                          axios
                            .post(`${baseURL}/employees/send_otp_to_employee`, values)
                            .then((res) => {
                              if (res && res.data && res.data.message !== undefined) {
                                const notify = () => toast.success(res.data.message);
                                notify();
                                sethideSendEmail(values.email);
                                sethideSendOtp(false);
                              }
                            })
                            .catch((error) => {
                              if (error.response) {
                                const notify = () =>
                                  toast.error(error.response.data.message, {
                                    position: 'top-center',
                                  });
                                notify();
                              }
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
                          <Stack spacing={2}>
                            <TextField
                              type="email"
                              label="Email address"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <span className="text-danger">{errors.email && touched.email && errors.email}</span>

                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                              Send OTP
                            </Button>
                          </Stack>
                        </form>
                      )}
                    </Formik>
                  )}
                  {/* CHECK OTP FORM */}
                  {hideSendEmail && (
                    <Formik
                      initialValues={{ email: hideSendEmail, otp: '' }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = '**Email Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                          errors.email = 'Invalid email address';
                        }
                        if (!values.otp) {
                          errors.otp = '**Otp Required';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log('OTPCheck', values);
                        const notify = () => toast('Please wait for a while...');
                        notify();
                        setTimeout(() => {
                          axios
                            .post(`${baseURL}/employees/check_otp_in_employee_model`, values)
                            .then((res) => {
                              if (res && res.data && res.data.message !== undefined) {
                                const notify = () => toast.success(res.data.message);
                                setUserId(res.data.data._id);
                                notify();
                                handleOpenChangePassModel();
                              } else {
                                console.log('error h bhai');
                              }
                              handleClose();
                            })
                            .catch((error) => {
                              if (error.response) {
                                const notify = () =>
                                  toast.error(error.response.data.message, {
                                    position: 'top-center',
                                  });
                                notify();
                              }
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
                          <Stack spacing={2}>
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
                              type="text"
                              label="Enter OTP"
                              name="otp"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.otp}
                            />
                            <span className="text-danger">{errors.email && touched.email && errors.email}</span>

                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                              Submit
                            </Button>
                          </Stack>
                        </form>
                      )}
                    </Formik>
                  )}
                </Box>
              </Modal>

              {/* =========== CHANGE PASSWORD MODAL ============== */}
              <Modal
                open={openChangePassModel}
                onClose={handleCloseChangePassModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Reset Your Password :
                  </Typography>
                  <Formik
                    initialValues={{ password: '', confPassword: '' }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.password) {
                        errors.password = '**Password required';
                      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/i.test(values.password)) {
                        errors.password =
                          'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 ';
                      }
                      if (!values.confPassword) {
                        errors.confPassword = '**Confirm Password required';
                      } else if (values.confPassword !== values.password) {
                        errors.confPassword = '**Password did not matched..!!';
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const notify = () => toast('Please wait for a while...');
                      notify();
                      setTimeout(() => {
                        axios
                          .put(`${baseURL}/employees/update_employee/${userId}`, values)
                          .then((res) => {
                            if (res && res.data && res.data.message !== undefined) {
                              const notify = () => toast.success(res.data.message);
                              notify();
                              handleCloseChangePassModel();
                            }
                          })
                          .catch((error) => {
                            if (error.response) {
                              const notify = () =>
                                toast.error(error.response.data.message, {
                                  position: 'top-center',
                                });
                              notify();
                              handleCloseChangePassModel();
                            }
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
                        <Stack spacing={2}>
                          <TextField
                            type="password"
                            label="New Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span className="text-danger">{errors.password && touched.password && errors.password}</span>

                          <TextField
                            type="password"
                            label="Confirm Password"
                            name="confPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confPassword}
                          />
                          <span className="text-danger">
                            {errors.confPassword && touched.confPassword && errors.confPassword}
                          </span>

                          <Button type="submit" variant="contained" disabled={isSubmitting}>
                            Submit
                          </Button>
                        </Stack>
                      </form>
                    )}
                  </Formik>
                </Box>
              </Modal>
            </form>
          )}
        </Formik>
      </Stack>
    </>
  );
}
