import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  decrementQuantity,
  getCartItems,
  getCartTotalAmount,
  getCartTotalItems,
  incrementQuantity,
  removeCartItem,
} from "../redux/addToCart/addToCartAction";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BaseURL } from "../utils/nameSpace";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const token = localStorage.getItem("UserToken");

  const { cartItems, totalAmount } = useSelector((state) => state?.cart);
  const { success } = useSelector((state) => state?.cart);

  useEffect(() => {
    if (success) {
      dispatch(getCartItems());
      dispatch(getCartTotalAmount());
      // dispatch(removeCartItem());
    }
  }, [success, dispatch]);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const deleteCartItem = (id) => {
    dispatch(removeCartItem(id));
  };
  const goToLoginPage = () => {
    navigation("/signin");
  };
  const proceedToPayment = () => {
    const notify = () => toast.success("payment Successfull..!!");
    notify();
  };

  useEffect(() => {
    if (token) {
      dispatch(getCartItems());
      dispatch(getCartTotalItems());
      dispatch(getCartTotalAmount());
    }
  }, [token,dispatch]);

  if (!token) {
    return (
      <Container>
        <Row>
          <Col>
            <div className="font-bold my-3 text-xl">
              Please login first to view your cart.😀
            </div>
            <div className="my-4">
              Go To Login Page{" "}
              <Button variant="contained" onClick={goToLoginPage}>
                Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="bg-slate-200">
      <Row className="mt-4 mb-1 ">
        <Col sm={12} className="my-3 font-bold text-xl">
          Cart Items
        </Col>
        {!cartItems || cartItems.length === 0 ? (
          <div className="font-bold">
            Cart is Empty,Go and Grab new Offers &#128512;
          </div>
        ) : (
          cartItems &&
          cartItems.map((item) => {
            const { _id, thumbnail, name, quantity, price } = item;
            return (
              <Col sm={12} className="bg-red-300 relative my-3" key={_id}>
                <div className="absolute right-1 top-1">
                  <button
                    className="hover:bg-slate-50"
                    onClick={() => deleteCartItem(_id)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <Row className="flex p-3">
                  <Col sm={4} className="flex justify-center items-center">
                    <img
                      src={`${BaseURL}/uploads/products/${thumbnail}`}
                      alt={name}
                      className="h-40"
                    />
                  </Col>
                  <Col sm={6} className="sm:text-left">
                    <div className="my-3 font-bold">{name}</div>
                    <div className="my-3">
                      <span className="font-semibold"> Product Prize : </span>
                      <span className="text-sm font-semibold"> {price}</span>
                    </div>
                    <div className="my-3">
                      <span className="font-semibold"> SubTotal : </span>
                      <span className="text-sm font-semibold">
                        {price * quantity}
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start">
                      <span className="px-1 font-semibold">Quantity :</span>
                      {quantity === 1 ? (
                        <Button
                          variant="contained"
                          color="error"
                          disabled
                          onClick={() => handleDecrement(_id)}
                        >
                          -
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDecrement(_id)}
                        >
                          -
                        </Button>
                      )}

                      <input
                        type="text"
                        className="h-9 w-10 px-[0.7rem]"
                        readOnly
                        value={quantity}
                      />
                      {quantity === 10 ? (
                        <Button
                          variant="contained"
                          color="success"
                          disabled
                          onClick={() => handleIncrement(_id)}
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleIncrement(_id)}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            );
          })
        )}
      </Row>
      {totalAmount ? (
        <>
          <Row className="flex bg-blue-900 text-white py-3">
            <Col>Total Amount</Col>:<Col>{totalAmount}</Col>
          </Row>
          <Row className="flex bg-orange-200 text-white py-3">
            <Col>
              <Button
                variant="contained"
                color="secondary"
                onClick={proceedToPayment}
              >
                Procced To Payment
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
      <ToastContainer />
    </Container>
  );
};

export default CartPage;
