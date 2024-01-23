import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoryBar from "../components/Category/CategoryBar";
import Carousel from "../components/Carousel/Carousel";
import CommonSlider from "../components/CommenSlider/CommonSlider";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/categoryBar/categoryActions";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryData = useSelector(
    (state) => state?.category?.categories?.data
  );
  return (
    <Container fluid className="g-0">
      <Row className="g-0">
        <Col>
          <CategoryBar />
        </Col>
      </Row>
      <Row className="g-0">
        <Col>
          <Carousel />
        </Col>
      </Row>
      <Row className="g-0">
        {categoryData &&
          categoryData.map((item) => <CommonSlider categoryName={item.name} key={item._id} />)}
      </Row>
    </Container>
  );
};

export default HomePage;
