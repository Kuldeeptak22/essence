import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const data = [
  {
    question: "What are the delivery charges?",
    answer:
      "Delivery charge varies with each Seller.Sellers incur relatively higher shipping costs on low value items. In such cases, charging a nominal delivery charge helps them offset logistics costs. Please check your order summary to understand the delivery charges for individual products.For Products listed as Essence Plus, a Rs 40 charge for delivery per item may be applied if the order value is less than Rs 500. While, orders of Rs 500 or above are delivered free.",
  },
  {
    question:
      "Why does the delivery date not correspond to the delivery timeline of X-Y business days?",
    answer:
      "It is possible that the Seller or our courier partners have a holiday between the day your placed your order and the date of delivery, which is based on the timelines shown on the product page. In this case, we add a day to the estimated date. Some courier partners and Sellers do not work on Sundays and this is factored in to the delivery dates.",
  },
  {
    question: "What is the estimated delivery time?",
    answer:
      "Sellers generally procure and ship the items within the time specified on the product page. Business days exclude public holidays and Sundays.",
  },
  {
    question:
      "Are there any hidden costs (sales tax, octroi etc) on items sold by Sellers on Essence?",
    answer:
      "There are NO hidden charges when you make a purchase on Essence. List prices are final and all-inclusive. The price you see on the product page is exactly what you would pay.Delivery charges are not hidden charges and are charged (if at all) extra depending on the Seller's shipping policy.",
  },
];

const ShippingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row className="py-6 flex items-center">
        <Col>
          <div className="text-left font-bold text-2xl my-2">Shipping</div>
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

export default ShippingPage;
