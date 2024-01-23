import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/add_product", addProduct);
router.get("/get_products", getProducts);
router.get("/get_product/:product_id", getProduct);
router.put("/update_product/:product_id", updateProduct);
router.delete("/delete_product/:product_id", deleteProduct);
router.delete("/remove_product/:product_id", removeProduct);

export default router;
