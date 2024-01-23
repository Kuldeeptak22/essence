import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row } from "react-bootstrap";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommonCard from "../CommonCard/CommonCard";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OfferCard from "../OfferCard/OfferCard";
import { getSubCategories } from "../../redux/subCategory/subCategoryAction";
import { NavLink } from "react-router-dom";

const CommonSlider = ({ categoryName, topic }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const subCategoryData = useSelector(
    (state) => state?.subCategory?.subCategories?.data
  );

  useEffect(() => {
    setIsLoading(false);
    dispatch(getSubCategories());
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
      className="d-flex justify-center flex-col align-middle items-center bg-slate-200 my-2"
    >
      <Row className="w-[97%]">
        <div className="flex justify-between items-center">
          <div className="flex p-4 font-bold sm:text-xl text-[0.8rem] sm:text-center">
            {categoryName}
          </div>
          <div className="flex p-4 font-bold sm:text-xl text-[0.8rem] sm:text-center cursor-pointer">
            <NavLink to={`/viewall/${categoryName}`} className="nav-link">
              <span>View All</span>
            </NavLink>
            <span>
              <NavigateNextIcon />
            </span>
          </div>
        </div>

        {isLoading && (
          <div className="d-flex">
            <Skeleton
              variant="rectangle"
              animation="wave"
              height={220}
              width={400}
            />
          </div>
        )}

        <Slider {...settings} className="py-2">
          {subCategoryData &&
            subCategoryData
              .filter((a) => a.category.name === categoryName)
              .map((elem) =>
                topic === "offers" ? (
                  <OfferCard elem={elem} key={elem._id} />
                ) : (
                  <CommonCard elem={elem} key={elem._id} />
                )
              )}
        </Slider>
      </Row>
    </Container>
  );
};

export default CommonSlider;
