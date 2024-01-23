import express from "express";
import auth from "../middlewares/auth.middleware";
import {
  addToCart,
  deleteCartItem,
  getCartData,
  updateCartQuantity,
} from "../controllers/cart.controller";
const router = express.Router();

router.post("/add_to_cart", auth, addToCart);
router.get("/get_from_cart", auth, getCartData);
router.put("/update_cart_item/:cart_id", updateCartQuantity);
router.delete("/delete_cart_item/:cart_id", deleteCartItem);

export default router;
