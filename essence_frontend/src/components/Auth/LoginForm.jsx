import React, { useState } from "react";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BaseURL } from "../../utils/nameSpace";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 340,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const LoginForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [hideSendEmail, sethideSendEmail] = useState(false);
  const [hideSendOtp, sethideSendOtp] = useState(true);
  const [userId, setUserId] = useState("");
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const handleOpenChangePassModel = () => {
    setOpenChangePassModel(true);
  };
  const handleCloseChangePassModel = () => setOpenChangePassModel(false);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password Required";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/i.test(
              values.password
            )
          ) {
            errors.password =
              "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          localStorage.setItem("UserEmail", values.email);
          setTimeout(() => {
            axios
              .post(`${BaseURL}/users/sign_in`, values)
              .then((res) => {
                const notify = () => toast.success(res?.data?.message);
                localStorage.setItem(
                  "UserToken",
                  JSON.stringify(res.data.token)
                );
                let userData = {};
                userData.firstName = res.data.data.firstName;
                userData.avatar = res.data.data.avatar;
                localStorage.setItem("UserData", JSON.stringify(userData));
                notify();
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              })
              .catch((error) => {
                const notify = () =>
                  toast.error(error.response.data.message, {
                    position: "top-center",
                  });
                notify();
              });
            values.email = "";
            values.password = "";
            values.contact = "";
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
            <div className="">
              <div className="border-b border-gray-900/10 pb-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="email"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <span className="text-red-600 text-sm">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        autoComplete="password"
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <span className="text-red-600 text-sm">
                      {errors.password && touched.password && errors.password}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" text-sm text-blue-300 cursor-pointer hover:text-yellow-200"
              onClick={handleOpen}
            >
              Forgot password?
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
            <ToastContainer />

            {/* ============ Forget Password Modal ========= */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="mb-3"
                >
                  Registered Email:
                </Typography>
                {/* SEND OTP FORM */}
                {hideSendOtp && (
                  <Formik
                    initialValues={{ email: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "**Email Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const notify = () => toast("Please wait for a while...");
                      notify();
                      setTimeout(() => {
                        axios
                          .post(`${BaseURL}/users/send_otp`, values)
                          .then((res) => {
                            if (
                              res &&
                              res.data &&
                              res.data.message !== undefined
                            ) {
                              const notify = () =>
                                toast.success(res.data.message);
                              notify();
                              sethideSendEmail(values.email);
                              sethideSendOtp(false);
                            }
                          })
                          .catch((error) => {
                            if (error.response) {
                              const notify = () =>
                                toast.error(error.response.data.message, {
                                  position: "top-center",
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
                          <span className="text-danger">
                            {errors.email && touched.email && errors.email}
                          </span>

                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                          >
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
                    initialValues={{ email: hideSendEmail, otp: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "**Email Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      if (!values.otp) {
                        errors.otp = "**Otp Required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const notify = () => toast("Please wait for a while...");
                      notify();
                      setTimeout(() => {
                        axios
                          .post(
                            `${BaseURL}/users/check_otp_in_user_model`,
                            values
                          )
                          .then((res) => {
                            if (
                              res &&
                              res.data &&
                              res.data.message !== undefined
                            ) {
                              const notify = () =>
                                toast.success(res.data.message);
                              setUserId(res.data.data._id);
                              notify();
                              handleOpenChangePassModel();
                            } else {
                              const notify = () => toast.error("Oooppsss..!!!");
                              notify();
                            }
                            handleClose();
                          })
                          .catch((error) => {
                            if (error.response) {
                              const notify = () =>
                                toast.error(error.response.data.message, {
                                  position: "top-center",
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
                          <span className="text-danger">
                            {errors.email && touched.email && errors.email}
                          </span>
                          <TextField
                            type="text"
                            label="Enter OTP"
                            name="otp"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.otp}
                          />
                          <span className="text-danger">
                            {errors.email && touched.email && errors.email}
                          </span>

                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                          >
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
                  initialValues={{ password: "", confPassword: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.password) {
                      errors.password = "**Password required";
                    } else if (
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/i.test(
                        values.password
                      )
                    ) {
                      errors.password =
                        "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 ";
                    }
                    if (!values.confPassword) {
                      errors.confPassword = "**Confirm Password required";
                    } else if (values.confPassword !== values.password) {
                      errors.confPassword = "**Password did not matched..!!";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const notify = () => toast("Please wait for a while...");
                    notify();
                    setTimeout(() => {
                      axios
                        .put(`${BaseURL}/users/update_user/${userId}`, values)
                        .then((res) => {
                          if (
                            res &&
                            res.data &&
                            res.data.message !== undefined
                          ) {
                            const notify = () =>
                              toast.success(res.data.message);
                            notify();
                            handleCloseChangePassModel();
                          }
                        })
                        .catch((error) => {
                          if (error.response) {
                            const notify = () =>
                              toast.error(error.response.data.message, {
                                position: "top-center",
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
                        <span className="text-danger">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>

                        <TextField
                          type="password"
                          label="Confirm Password"
                          name="confPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confPassword}
                        />
                        <span className="text-danger">
                          {errors.confPassword &&
                            touched.confPassword &&
                            errors.confPassword}
                        </span>

                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                        >
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
    </>
  );
};

export default LoginForm;
