import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CEO from "../essets/images/kalyan.png";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row className="py-6 flex items-center">
        <Col sm={6}>
          <p className="text-left font-bold text-2xl">About Us</p>
          <p className="text-[0.8rem] lg:text-[1rem] text-left" >
            The Essence Group is one of India’s leading digital commerce
            entities and includes group companies Essence, Myntra, Essence
            Wholesale, Essence Health+, and Cleartrip. Started in 2007, Essence
            has enabled millions of sellers, merchants, and small businesses to
            participate in India's digital commerce revolution. With a
            registered customer base of more than 500 million, Essence's
            marketplace offers over 150 million products across 80+ categories.
            Today, there are over 14 lakh sellers on the platform, including
            Shopsy sellers. With a focus on empowering and delighting every
            Indian by delivering value through technology and innovation,
            Essence has created lakhs of jobs in the ecosystem while empowering
            generations of entrepreneurs and MSMEs. Essence is known for
            pioneering services such as Cash on Delivery, No Cost EMI and easy
            returns, which are customer-centric innovations that have made
            online shopping more accessible and affordable for millions of
            Indians.
          </p>
        </Col>
        <Col sm={6}>
          <img src={CEO} alt="CEO" className="rounded" loading="eager"/>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
