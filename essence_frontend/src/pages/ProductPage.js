import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../redux/products/poductAction";
import ProductCard from "../components/ProductCard/ProductCard";
import { getSubCategories } from "../redux/subCategory/subCategoryAction";

const ProductPage = () => {
  const subCatId = useParams();
  const dispatch = useDispatch();

  const ProductData = useSelector((state) => state?.product?.products);
  const subCategoryData = useSelector(
    (state) => state?.subCategory?.subCategories?.data
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSubCategories());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <Row>
        {subCategoryData &&
          subCategoryData
            .filter((a) => a._id === subCatId?.subCatId)
            .map((element) => (
              <p className="my-3 font-bold text-2xl" key={element._id}>{`${element.name} Items`}</p>
            ))}

        {ProductData &&
          ProductData.filter(
            (a) => a?.subcategory?._id === subCatId?.subCatId
          ).map((item) => (
            <Col sm={3} className="my-5" key={item._id}>
              <ProductCard elem={item} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ProductPage;

