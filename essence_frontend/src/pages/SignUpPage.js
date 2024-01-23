import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import signUp from "../essets/images/auth/Sign up.svg";
import SignUpForm from "../components/Auth/SignUpForm";
import { NavLink } from "react-router-dom";

const SignUpPage = () => {
  return (
    <Container fluid >
      <Row className="sm:px-5 py-3 bg-black">
        <Col sm={5} className="text-left">
          <div class="mt-2">
            <div class="border-b border-gray-900/10 pb-12">
              <p class="mt-5 mx-2 text-3xl font-semibold leading-7 text-white">
                Sign Up
              </p>
            </div>
          </div>
          <SignUpForm />
          <div className="my-2 sm:flex justify-between align-middle items-center">
            <div className="text-white">Don’t have an account?</div>
            <Button className="text-yellow-200 my-2">
              <NavLink className="nav-link" to="/signin">
                Login
              </NavLink>
            </Button>
          </div>
        </Col>
        <Col
          sm={6}
          className="flex sm:mx-7 my-3 justify-center"
          style={{
            background: "rgba(47,58,157,8)",
            borderRadius: "7px",
          }}
        >
          <img src={signUp} alt="signUp" />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
