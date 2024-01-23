import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/contact/contactAction";

const ContactPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row>
        <Col className="py-3 text-left" sm={6}>
          <p className="text-left font-bold text-2xl">Contact Page</p>
          <p className="px-1">
            The Essence Help Centre page lists out various types of issues that
            you may have encountered so that there can be quick resolution and
            you can go back to shopping online. For example, you can get more
            information regarding order tracking, delivery date changes, help
            with returns (and refunds), and much more. The Essence Help Centre
            also lists out more information that you may need regarding Essence
            Plus, payment, shopping, and more. The page has various filters
            listed out on the left-hand side so that you can get your queries
            solved quickly, efficiently, and without a hassle. You can get the
            Essence Help Centre number or even access Essence Help Centre
            support if you need professional help regarding various topics. The
            support executive will ensure speedy assistance so that your
            shopping experience is positive and enjoyable. You can even inform
            your loved ones of the support page so that they can properly get
            their grievances addressed as well. Once you have all your queries
            addressed, you can pull out your shopping list and shop for all your
            essentials in one place. You can shop during festive sales to get
            your hands on some unbelievable deals online. This information is
            updated on 11-Jan-24
          </p>
        </Col>
        <Col className="my-3 py-3 bg-gray-300 text-left" sm={6}>
          <Formik
            initialValues={{ email: "", message: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email Required!";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.message) {
                errors.message = "Message Required!";
              } else if (values.message.length < 20) {
                errors.message = "Write atleast in 20 Characters";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                dispatch(addContact(values));
                const notify = () =>
                  toast.success("Email Sent Successfully..!!");
                notify();
                values.email = "";
                values.message = "";
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
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <div className="pb-2">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Contact Us
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Share your Opinion and Suggstions with us.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            id="email"
                            autoComplete="email"
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <span className="text-red-800">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" pb-12">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Message
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="message"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            rows={3}
                            placeholder="Write Here..."
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={""}
                          />
                          <span className="text-red-800">
                            {errors.message &&
                              touched.message &&
                              errors.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Col>
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default ContactPage;
