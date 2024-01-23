import express from "express";
import {
  addBrand,
  deleteBrand,
  getBrand,
  getBrands,
  removeBrand,
  updateBrand,
} from "../controllers/brand.controller";
const router = express.Router();

router.post("/add_brand", addBrand);
router.get("/get_brands", getBrands);
router.get("/get_brand/:brand_id", getBrand);
router.put("/update_brand/:brand_id", updateBrand);
router.delete("/delete_brand/:brand_id", deleteBrand);
router.delete("/remove_brand/:brand_id", removeBrand);

export default router;
