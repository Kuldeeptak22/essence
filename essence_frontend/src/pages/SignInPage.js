import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import signIn from "../essets/images/auth/login.jpg";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../components/Auth/LoginForm";
import { NavLink } from "react-router-dom";

const SignInPage = ({ setUser, setToken }) => {
  return (
    <Container fluid>
      <Row className="sm:px-5 py-3 bg-black">
        <Col sm={5} className="text-left">
          <div className="mt-2">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="mt-5 mx-2 text-3xl font-semibold leading-7 text-white">
                Sign In
              </p>
            </div>
          </div>
          <LoginForm setUser={setUser} setToken={setToken} />
          <div className="my-2 sm:flex justify-between align-middle items-center">
            <div className="text-white">Don’t have an account?</div>
            <Button className="text-yellow-200 my-2">
              <NavLink className="nav-link" to="/signUp">
                Create Account
              </NavLink>
            </Button>
          </div>
        </Col>
        <Col sm={6} className="flex sm:mx-7 my-3 justify-center">
          <img src={signIn} alt="signIn" className="rounded" />
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
