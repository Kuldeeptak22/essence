import mongoose from "mongoose";
import UserModel from "./user.model";
import ProductModel from "./category.model";
const Schema = mongoose.Schema;
var CartSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    // required: true,
    default: null,
    ref: UserModel,
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: ProductModel,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
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

//Export the model
export default mongoose.model("cart", CartSchema);
