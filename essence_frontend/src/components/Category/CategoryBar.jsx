import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getCategories } from "../../redux/categoryBar/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import PopupCategory from "./PopupCategory";

const CategoryBar = () => {
  const [categoryDetails, setCategoryDetails] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryData = useSelector(
    (state) => state?.category?.categories?.data
  );

  const clickCategory = (categoryName) => {
    setCategoryDetails(categoryName);
  };
  return (
    <Container fluid className="g-0">
      <Row className="bg-red-400 g-0 py-4">
        {categoryData &&
          categoryData.map((category) => (
            <Col
              className="px-1"
              key={category._id}
              onClick={() => clickCategory(category?.name)}
            >
              <PopupCategory
                category={category?.name}
                clickedCategory={categoryDetails}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default CategoryBar;
