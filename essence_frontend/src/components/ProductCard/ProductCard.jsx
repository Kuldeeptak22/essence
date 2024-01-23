import React, { useEffect, useState } from "react";
import { Card, CardActionArea, Skeleton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { BaseURL } from "../../utils/nameSpace";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ elem }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goToProductDetailsPage = (id) => {
    navigate(`/productDetails/${id}`);
  };
  useEffect(() => {
    setIsLoading(true);
  }, [elem]);

  return (
    <>
      {isLoading ? (
        <Card
          sx={{ maxWidth: 400, margin: "5px" }}
          key={elem?.title}
          className="hover:scale-105"
          onClick={() => goToProductDetailsPage(elem?._id)}
        >
          <CardActionArea>
            <CardMedia
              style={{ height: 300, padding: "0px 20px" }}
              component="img"
              height="100%"
              width="100px"
              image={`${BaseURL}/uploads/products/${elem?.thumbnail}`}
              alt={elem?.name}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {elem?.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "green", fontSize: "1rem", fontWeight: "bold" }}
              >
                {elem?.price}/-
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Skeleton variant="rectangular" width={226} height={300} />
      )}
    </>
  );
};

export default ProductCard;
