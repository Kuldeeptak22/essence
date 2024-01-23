import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const data = [
  {
    question: " How do I pay for a Essence purchase?",
    answer:
      "Essence offers you multiple payment methods. Whatever your online mode of payment, you can rest assured that Essence's trusted payment gateway partners use secure encryption technology to keep your transaction details confidential at all times. You may use Internet Banking, Gift Card, Cash on Delivery and Wallet to make your purchase. Essence also accepts payments made using Visa, MasterCard, Maestro and American Express credit/debit cards in India and 21 other countries.",
  },
  {
    question:
      " Are there any hidden charges (Octroi or Sales Tax) when I make apurchase on Essence? ",
    answer:
      "There are NO hidden charges when you make a purchase on Essence. The prices listed for all the items are final and all-inclusive. The price you see on the product page is exactly what you pay. Delivery charges may be extra depending on the seller policy. Please check individual seller for the same. In case of seller WS Retail, the ₹50 delivery charge is waived off on orders worth ₹500 and over.",
  },
  {
    question: " What is Cash on Delivery?",
    answer:
      " If you are not comfortable making an online payment on Essence.com, you can opt for the Cash on Delivery (C-o-D) payment method instead. With C-o-D you can pay in cash at the time of actual delivery of the product at your doorstep, without requiring you to make any advance payment online. The maximum order value for a Cash on Delivery (C-o-D) payment is ₹50,000. It is strictly a cash-only payment method. Gift Cards or store credit cannot be used for C-o-D orders. Foreign currency cannot be used to make a C-o-D payment. Only Indian Rupees accepted.",
  },
  {
    question: "How do I pay using a credit/debit card? ",
    answer:
      "We accept payments made by credit/debit cards issued in India and 21 other countries. ",
  },
];

const PaymentPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      });
  return (
    <Container>
      <Row className="py-6 flex items-center">
        <Col>
          <div className="text-left font-bold text-2xl my-2">Payments</div>
          <div className="text-[0.8rem] lg:text-[1rem]">
            {data &&
              data.map((item) => (
                <div key={item.question}>
                  <p className="font-bold text-left">{item.question}</p>
                  <p className="text-left">{item.answer}</p>
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
