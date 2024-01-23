import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const data = [
  {
    para: "We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how Essence Internet Private Limited and its affiliates (collectively “Essence, we, our, us”) collect, use, share or otherwise process your personal information through Essence website www.Essence.com, its mobile application, and m-site (hereinafter referred to as the “Platform”).",
  },
  {
    para: "While you can browse sections of the Platform without the need of sharing any information with us, however, please note we do not offer any product or service under this Platform outside India.. By visiting this Platform, providing your information or availing out product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.",
  },
  {
    para: "When you use our Platform, we collect and store your information which is provided by you from time to time. In general, you can browse the Platform without telling us who you are or revealing any personal information about yourself. Once you give us your personal information, you are not anonymous to us. Where possible, we indicate which fields are required and which fields are optional. You always have the option to not provide information by choosing not to use a particular service, product or feature on the Platform.",
  },
  {
    para: "We may track your buying behavior, preferences, and other information that you choose to provide on our Platform. We use this information to do internal research on our users' demographics, interests, and behavior to better understand, protect and serve our users. This information is compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on our Platform or not), which URL you next go to (whether this URL is on our Platform or not), your computer browser information, and your IP address.",
  },
  {
    para: "If you choose to post messages on our message boards, chat rooms or other message areas or leave feedback on the Platform or the social media handles maintained by us or if you use voice commands or virtual try and buy or similar features to shop on the Platform, we will collect that information you provide to us. We retain this information as necessary to resolve disputes, provide customer support, troubleshoot problems or for internal research and analysis as permitted by law.",
  },
];
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row>
        <Col className="py-3">
          <p className="font-bold text-2xl my-3 text-left">Privacy Policy</p>

          {data && data.map((item) => <p className="text-left" key={item.para}>{item.para}</p>)}
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
