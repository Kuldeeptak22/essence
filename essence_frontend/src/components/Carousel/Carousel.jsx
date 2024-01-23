import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row } from "react-bootstrap";
import "./Carousel.scss";

const Carousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <Container
      fluid
      className="d-flex justify-center flex-col align-middle items-center g-0"
    >
      <Row className="w-[100%] p-0">
        <Slider {...settings} style={{padding:0}}>
          <div className="caraoselSlider imagesSlides1"></div>
          <div className="caraoselSlider imagesSlides2"></div>
          <div className="caraoselSlider imagesSlides3"></div>
          <div className="caraoselSlider imagesSlides4"></div>
          <div className="caraoselSlider imagesSlides5"></div>
          <div className="caraoselSlider imagesSlides6"></div>
        </Slider>
      </Row>
    </Container>
  );
};

export default Carousel;
