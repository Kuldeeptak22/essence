import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Method from "../../essets/images/company/payment-method.svg";
import WorkIcon from "@mui/icons-material/Work";
import StarsIcon from "@mui/icons-material/Stars";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpIcon from "@mui/icons-material/Help";

const Footer = () => {
  return (
    <Container fluid className="bg-black text-white">
      <Row className="py-5">
        <Col sm={6} className="border-r-[1px]">
          <Row className="px-4">
            <Col className="text-left">
              <p className="text-gray-400 text-[0.8rem]">ABOUT</p>
              {[
                {
                  name: "Contact Us",
                  to: "/contact",
                },
                {
                  name: "About Us",
                  to: "/about",
                },
              ].map((item) => (
                <NavLink className="nav-link" to={item.to} key={item.name}>
                  <span className="text-[0.8rem]">{item.name}</span>
                </NavLink>
              ))}
              <a
                className="text-white no-underline"
                href="https://www.Essencecareers.com/?otracker=${otracker}_navlinks#!/"
                target="_block"
              >
                <span className="text-[0.8rem]">Careers</span>
              </a>
            </Col>
            <Col className="text-left">
              <p className="text-gray-400 text-[0.8rem]">HELP</p>
              {[
                {
                  name: "Payments",
                  to: "/payment",
                },
                {
                  name: "Shipping",
                  to: "/shipping",
                },
                {
                  name: "Cancellation & Returns",
                  to: "/cancellation",
                },
              ].map((item) => (
                <NavLink className="nav-link" to={item.to} key={item.name}>
                  <span className="text-[0.8rem]">{item.name}</span>
                </NavLink>
              ))}
            </Col>
            <Col className="text-left">
              <p className="text-gray-400 text-[0.8rem]">CONSUMER POLICY</p>
              {[
                {
                  name: "Cancellation & Returns",
                  to: "/cancellation",
                },
                {
                  name: "Terms Of Use",
                  to: "/termsofuse",
                },
                {
                  name: "Privacy",
                  to: "/privacy",
                },
              ].map((item) => (
                <NavLink className="nav-link" to={item.to} key={item.name}>
                  <span className="text-[0.8rem]">{item.name}</span>
                </NavLink>
              ))}
            </Col>
            <Col className="text-left">
              <p className="text-gray-400 text-[0.8rem]">SOCIAL</p>
              {[
                {
                  name: "Facebook",
                  to: "https://www.facebook.com/flipkart",
                },
                {
                  name: "Twitter",
                  to: "https://twitter.com/flipkart",
                },
                {
                  name: "YouTube",
                  to: "https://www.youtube.com/flipkart",
                },
              ].map((item) => (
                <a className="no-underline text-white" href={item.to} target="blank" key={item.name}>
                  <span className="text-[0.8rem] block">{item.name}</span>
                </a>
              ))}
            </Col>
          </Row>
        </Col>
        <Col sm={6}>
          <Row className="px-4">
            <Col className="text-left">
              <p className="text-gray-400 text-[0.8rem]">MAIL US:</p>
              {[
                "Essence Internet Private Limited,",
                " Buildings Alyssa, Begonia &",
                " Clove Embassy Tech Village,",
                " Outer Ring Road, Devarabeesanahalli Village,",
                " Bengaluru, 560103,",
                " Karnataka, India",
              ].map((item) => (
                <span className="text-[0.8rem] block" key={item}>{item}</span>
              ))}
            </Col>
            <Col className="text-left">
              <p className="text-gray-400 text-[0.8rem]">
                REGISTERED OFFICE ADDRESS:
              </p>
              {[
                "Essence Internet Private Limited,",
                " Buildings Alyssa, Begonia &",
                " Clove Embassy Tech Village,",
                " Outer Ring Road, Devarabeesanahalli Village,",
                " Bengaluru, 560103,",
                " Karnataka, India",
                " CIN : U51109KA2012PTC066107 ",
              ].map((item) => (
                <span className="text-[0.8rem] block" key={item}>{item}</span>
              ))}
              <span className="text-[0.8rem] block">
                Telephone:{" "}
                <a href="tel:+91-9664408473" className="no-underline">
                  91-9664408473
                </a>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row className="px-4 flex items-center pt-2 pb-4">
        {[
          {
            tagName: "Become a Seller",
            icon: <WorkIcon />,
          },
          {
            tagName: "Advertise",
            icon: <StarsIcon />,
          },
          {
            tagName: "Gift Cards",
            icon: <CardGiftcardIcon />,
          },
          {
            tagName: "Help Centers",
            icon: <HelpIcon />,
          },
        ].map((item) => (
          <Col sm={2} className="text-[0.8rem] flex items-center my-2 sm:my-0" key={item.tagName}>
            <span className="px-2 text-yellow-300">{item.icon}</span>
            <span>{item.tagName}</span>
          </Col>
        ))}

        <Col sm={2} className="text-[0.8rem] my-2 sm:my-0">
          © 2012-2024 <span>Essence.com</span>
        </Col>
        <Col sm={2} className="text-[0.8rem] ">
          <img src={Method} alt="Method" />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
