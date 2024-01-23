import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const data = [
  {
    question: "I see the 'Cancel' button but I can't click on it. Why?",
    answer:
      "A greyed-out and disabled 'Cancel' button can mean any one of the following: 1. The item has been delivered already OR 2. The item is non-refundable (e.g. Gift Card)",
  },
  {
    question:
      "Can I modify/change the specification for the ordered product without cancelling it?",
    answer:
      "No, once an order is placed the specification of the product can not be modified.",
  },
  {
    question: "Can I reinstate a cancelled order?",
    answer: "No, a cancelled order can not be reinstated.",
  },
  {
    question:
      "Why i am getting charged for cancellation? / What is cancellation Fee?",
    answer:
      "Cancellation fee will be applied or charged only if an eligible order is cancelled after 24 hours of placing. The reason is to compensate for the time and effort incurred in processing the order by the seller. Also, to compensate our logistics partner for incurring a cost when they ship the order, if the order is shipped. Note: Customer can find this information under the order details by logging into his/her Essence account. ",
  },
];

const CancellationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row className="py-6 flex items-center">
        <Col>
          <div className="text-left font-bold text-2xl my-2">
            Cancellation related
          </div>
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

export default CancellationPage;
