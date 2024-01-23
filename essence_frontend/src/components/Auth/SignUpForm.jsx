import React from "react";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BaseURL } from "../../utils/nameSpace";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contact: "",
        gender: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = "First Name Required";
        } else if (values.firstName.length < 3) {
          errors.firstName = "first Name Should have atleast 3 characters";
        }

        if (!values.lastName) {
          errors.lastName = "Last Name Required";
        } else if (values.lastName.length < 3) {
          errors.lastName = "Last Name Should have atleast 3 characters";
        }

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

        if (!values.contact) {
          errors.contact = "Contact Required";
        } else if (isNaN(values.contact)) {
          errors.contact = "Contact should be in Numbers Only.";
        } else if (values.contact.length !== 10) {
          errors.contact = "Contact no. should be 10 digits";
        }

        if (!values.gender) {
          errors.gender = "Gender Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          axios
            .post(`${BaseURL}/users/sign_up`, values)
            .then((res) => {
              const notify = () => toast.success(res.data.message);
              notify();
              setTimeout(() => {
                navigate("/signin");
              }, 1000);
            })
            .catch((res) => {
              const notify = () =>
                toast.error(res.response.data.message, {
                  position: "top-center",
                });
              notify();
            });
          values.firstName = "";
          values.lastName = "";
          values.email = "";
          values.password = "";
          values.contact = "";
          values.gender = "";
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
          <div>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      autoComplete="given-name"
                      className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-red-600 text-sm">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      autoComplete="family-name"
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-red-600 text-sm">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </span>
                </div>

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

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Contact no.
                  </label>
                  <div className="mt-1">
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contact}
                      autoComplete="contact"
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-red-600 text-sm">
                    {errors.contact && touched.contact && errors.contact}
                  </span>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Gender
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender}
                      autoComplete="gender-name"
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">None</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <span className="text-red-600 text-sm">
                      {errors.gender && touched.gender && errors.gender}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            <ToastContainer />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
