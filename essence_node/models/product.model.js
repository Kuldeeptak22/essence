import mongoose from "mongoose";
const Schema = mongoose.Schema;
import CategoryModel from "./category.model";
import SubcategoryModel from "./subcategory.model";
import BrandModel from "./brand.model";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: CategoryModel,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: SubcategoryModel,
  },
  brand: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: BrandModel,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: Array,
    default: [],
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("product", ProductSchema);
