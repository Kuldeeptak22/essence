import CartModel from "../models/cart.model";
import ProductModel from "../models/product.model";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { productID } = req.body;
    // item already present or not
    const cartItems = await CartModel.findOne({
      productID: productID,
      userID: new mongoose.Types.ObjectId(req.userData.id),
    });

    if (cartItems) {
      const quantity = cartItems.quantity + 1;
      if (quantity > 10) {
        return res.status(200).json({
          message: "Can not add more than 10 items",
        });
      }

      const updateCart = await CartModel.updateOne(
        {
          _id: cartItems._id, //cartId
        },
        {
          $set: {
            quantity: quantity,
          },
        }
      );

      if (updateCart.acknowledged) {
        return res.status(200).json({
          message: "Cart has been Successfully updated",
        });
      }
    } else {
      const product = await ProductModel.findOne({ _id: productID });
      const { name, price, quantity, thumbnail } = product;
      const saveCart = new CartModel({
        userID: new mongoose.Types.ObjectId(req.userData.id),
        productID: productID,
        name: name,
        price: price,
        quantity: quantity,
        thumbnail: thumbnail,
      });

      saveCart.save();
      if (saveCart) {
        return res.status(200).json({
          message: "Successfully added to cart",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCartData = async (req, res) => {
  try {
    const cartItems = await CartModel.find({
      userID: new mongoose.Types.ObjectId(req.userData.id),
    });
    if (cartItems) {
      return res.status(200).json({
        data: cartItems,
        message: "Successfully fetched...!!",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateCartQuantity = async (req, res) => {
  try {
    const cartID = req.params.cart_id;
    const { type } = req.query;
    const cartItem = await CartModel.findOne({ _id: cartID });
    var quantity = cartItem.quantity;
    if (type == "inc") {
      quantity += 1;
    }
    if (type == "desc") {
      quantity -= 1;
    }

    if (quantity > 10) {
      return res.status(200).json({
        message: "Sorry!! You can not add more than 10 items",
      });
    }

    if (quantity < 1) {
      const deleteItem = await CartModel.deleteOne({ _id: cartID });
      if (deleteItem.acknowledged) {
        return res.status(200).json({
          message: "item has been removed from the cart",
        });
      }
    }

    const update = await CartModel.updateOne(
      { _id: cartID },
      {
        $set: {
          quantity: quantity,
        },
      }
    );

    if (update.acknowledged) {
      return res.status(200).json({
        message: "Qunatity has been updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteCartItem = async (req, res) => {
  try {
    const cartID = req.params.cart_id;
    const deleteItem = await CartModel.deleteOne({ _id: cartID });
    if (deleteItem.acknowledged) {
      return res.status(200).json({
        message: "item has been Deleted from cart",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
