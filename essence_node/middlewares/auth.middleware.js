import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]; 
      try {
        let decodeToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.userData = decodeToken;
        next();
      } catch (verificationError) {
        if (verificationError.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Token expired",
          });
        } else if (verificationError.name === "JsonWebTokenError") {
          return res.status(401).json({
            message: "Invalid token",
          });
        } else {
          throw verificationError;
        }
      }
    } else {
      return res.status(401).json({
        message: "Access Denied, Token not available..!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default auth;
