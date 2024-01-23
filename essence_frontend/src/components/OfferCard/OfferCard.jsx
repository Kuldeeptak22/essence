import React, { useEffect, useState } from "react";
import { Card, CardActionArea, Skeleton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { BaseURL } from "../../utils/nameSpace";
import { useNavigate } from "react-router-dom";

const OfferCard = ({ elem }) => {
  const navigate = useNavigate();

  const goToProductsPage = (id) => {
    navigate(`/products/${id}`);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [elem]);

  return (
    <>
      {isLoading ? (
        <Card
          sx={{ maxWidth: 400, margin: "5px", height: "100%" }}
          key={elem?.title}
          onClick={() => goToProductsPage(elem?._id)}
        >
          <CardActionArea>
            <CardMedia
              style={{ height: 230, padding: "20px" }}
              component="img"
              height="100%"
              width="100px"
              image={`${BaseURL}/uploads/subCategories/${elem?.image}`}
              alt={elem?.name}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {elem?.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ color: "green", fontSize: "15px" }}
              >
                Min. 50% Off
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

export default OfferCard;
