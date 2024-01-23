import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../redux/products/poductAction";
import { BaseURL } from "../utils/nameSpace";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { Button } from "@mui/material";
import { addCartItems} from "../redux/addToCart/addToCartAction";

const ProductDetails = () => {
  const productId = useParams();
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState(null);
  const [disable, setDisableButton] = useState(null);
  const dispatch = useDispatch();

  const ProductData = useSelector((state) => state?.product?.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const changeDisplayImage = (elem) => {
    setDisplayImage(elem);
  };

  const addToCart = (id, data) => {
    const token = localStorage.getItem("UserToken");
    if (token) {
      dispatch(addCartItems(id, token));
      setDisableButton(data);
    } else {
      navigate("/signin");
    }
  };

  return (
    <Container>
      {ProductData &&
        ProductData.filter((a) => a._id === productId?.productId).map(
          (item) => (
            <Row className="my-4" key={item._id}>
              <Col sm={5} className="sticky-column">
                <Row>
                  <Col>
                    {item.images &&
                      item.images.map((elem) => (
                        <img
                          className="my-2 max-h-11 cursor-pointer displayImage"
                          style={{ border: "1px solid black" }}
                          src={`${BaseURL}/uploads/products/${elem}`}
                          alt={elem}
                          onMouseOver={() => changeDisplayImage(elem)}
                          key={elem}
                        />
                      ))}
                  </Col>
                  <Col xs={9}>
                    {displayImage ? (
                      <img
                        className="max-h-96 p-2"
                        src={`${BaseURL}/uploads/products/${displayImage}`}
                        alt={item?.name}
                      />
                    ) : (
                      <img
                        className="max-h-96 p-2"
                        src={`${BaseURL}/uploads/products/${item.thumbnail}`}
                        alt={item?.name}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm={7} className="my-3 sm:my-0">
                <Row>
                  <Col xs={12} className="font-bold text-[xl/2]">
                    {item?.name}
                  </Col>
                  <Col>
                    <span className="text-yellow-500">
                      <span className="text-black"> {item?.stars}</span>
                      {Array.from({ length: item?.stars }).map((_, index) => (
                        <StarIcon key={index} />
                      ))}
                      {Array.from({ length: 5 - (item?.stars || 0) }).map(
                        (_, index) => (
                          <StarBorderIcon key={index} />
                        )
                      )}
                    </span>
                  </Col>
                  <Col className="text-blue-700">{item?.rating} Ratings</Col>
                  <hr className="text-black pr-3 my-2 sm:mx-3" />
                  <Col xs={12} className="text-gray-500 text-[0.9rem]">
                    MRP : ₹ <s>{item?.price}</s>
                  </Col>
                  <Col xs={12}>
                    <span className="text-gray-500">Deal Of The Day :</span>
                    <span className="text-red-700 font-bold px-1">
                      ₹ {item?.price - 400} excl. GST
                    </span>
                  </Col>
                  <Col sm={12} className="text-gray-500 text-[0.9rem]">
                    Ends in 4 days
                  </Col>
                  <Col sm={12}>
                    <span className="text-gray-500">You Save :</span>
                    <span className="text-red-700 px-1">₹ (400)</span>
                  </Col>
                  <Col sm={12} className="text-gray-500 text-[0.9rem]">
                    Inclusive of all taxes
                  </Col>
                  <Col xs={12} className="text-gray-500 text-[0.9rem] px-3">
                    <p className="lg:px-5">{item?.shortDescription}</p>
                  </Col>
                  <Col
                    xs={12}
                    className="text-gray-500 text-[0.9rem] px-3 pb-3"
                  >
                    {disable ? (
                      <Button
                        color="primary"
                        variant="contained"
                        disabled
                        onClick={() => addToCart(item._id, "clicked")}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => addToCart(item._id, "clicked")}
                      >
                        Add To Cart
                      </Button>
                    )}
                  </Col>
                  <hr className="text-black pr-3 my-2 sm:mx-3" />
                  <Col sm={12} className="text-gray-500 text-[0.9rem]">
                    <Row>
                      <Col>
                        <span className="block">
                          <LocalShippingIcon />
                        </span>
                        Free Delivery
                      </Col>
                      <Col>
                        <span className="block">
                          <AssignmentReturnIcon />
                        </span>
                        7 days Returns & Exchange
                      </Col>
                    </Row>
                  </Col>
                  <hr className="text-black pr-3 my-4 sm:mx-3" />
                  <Col xs={12} className="text-gray-500 text-[0.9rem] px-3">
                    <p className="text-black font-bold text-left">
                      About This Item:
                    </p>
                    <p className="lg:px-5">{item.description}</p>
                  </Col>
                </Row>
              </Col>
              <ToastContainer />
            </Row>
          )
        )}
    </Container>
  );
};

export default ProductDetails;
