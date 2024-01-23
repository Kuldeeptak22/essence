import express from "express";
import {
  addSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  removeSubCategory,
  updateSubCategory,
} from "../controllers/subcategory.controller";

const router = express.Router();

router.post("/add_subcategory", addSubCategory);
router.get("/get_subcategories", getSubCategories);
router.get("/get_subcategory/:subcategory_id", getSubCategory);
router.put("/update_subcategory/:subcategory_id", updateSubCategory);
router.delete("/delete_subcategory/:subcategory_id", deleteSubCategory);
router.delete("/remove_subcategory/:subcategory_id", removeSubCategory);

export default router;
