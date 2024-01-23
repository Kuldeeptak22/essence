import fs from "fs";
import multer from "multer";
import ProductModel from "../models/product.model";
import { storage } from "../utils/multerFilter";

const upload = multer({ storage: storage });
export const addProduct = async (req, res) => {
  try {
    const uploadMiddleware = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);

    uploadMiddleware(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      let thumbnailImage = null;
      let imageArray = [];
      if (req.files["thumbnail"]) {
        thumbnailImage = req.files["thumbnail"][0].filename;
      }

      if (req.files["images"]) {
        req.files["images"].forEach((image) => {
          imageArray.push(image.filename);
        });
      }

      const product = await ProductModel.create({
        ...req.body,
        thumbnail: thumbnailImage,
        images: imageArray,
      });

      if (product) {
        return res.status(201).json({
          data: product,
          message: "Item has been added Successfully...!!",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const { page, size, search, minPrice, maxPrice, sortFilter } = req.query;
    const skipNo = (page - 1) * size;
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search);

    let filter = { status: 1 };
    if (search !== undefined) {
      filter = {
        ...filter,
        $or: [
          { name: { $regex: searchRgx, $options: "i" } },
          { shortDescription: { $regex: searchRgx, $options: "i" } },
          { description: { $regex: searchRgx, $options: "i" } },
        ],
      };
    }
    if (minPrice && maxPrice !== undefined) {
      filter = {
        ...filter,
        price: {
          $gte: parseFloat(minPrice),
          $lte: parseFloat(maxPrice),
        },
      };
    }

    let productArray = [];
    if (page && size !== undefined) {
      productArray.push(
        {
          $skip: skipNo,
        },
        {
          $limit: parseInt(size),
        }
      );
    }

    if (sortFilter === "asc" || sortFilter === "dsc") {
      productArray.push({
        $sort: {
          price: sortFilter === "asc" ? 1 : -1,
        },
      });
    }

    productArray.push(
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "categories", // from cetegory collection
          localField: "category", // category field of product collection
          foreignField: "_id", // // category_id field of product collection
          as: "category",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$category" },
      { $unwind: "$brand" },
      { $unwind: "$subcategory" }
    );

    const products = await ProductModel.aggregate(productArray);

    if (products !== undefined) {
      return res.status(200).json({
        data: products,
        total: products.length,
        message: "Data has been Successfully fatched..!!",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const productData = await ProductModel.findOne({
      status: 1,
      _id: productID,
    });
    if (productData) {
      return res.status(200).json({
        data: productData,
        message: "Data has been Successfully Matched",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const uploadProductData = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);

    uploadProductData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const productID = req.params.product_id;
      const {
        name,
        category,
        subcategory,
        brand,
        price,
        quantity,
        shortDescription,
        description,
        rating,
        stars,
      } = req.body;
      const existProduct = await ProductModel.findOne({ _id: productID });
      let thumb = existProduct.thumbnail;
      let thumbnailImage = thumb;
      let imageArray = existProduct.images || [];

      // ========================================
      //   if thumbnail will change
      if (req.files["thumbnail"]) {
        thumbnailImage = req.files["thumbnail"][0].filename;
        if (fs.existsSync("./uploads/products/" + existProduct.thumbnail)) {
          fs.unlinkSync("./uploads/products/" + existProduct.thumbnail);
        }
      }

      //   if Image array will change
      if (req.files["images"]) {
        imageArray.forEach((item) => {
          if (fs.existsSync("./uploads/products/" + item)) {
            fs.unlinkSync("./uploads/products/" + item);
          }
        });
        imageArray = [];
        req.files["images"].forEach((image) => {
          imageArray.push(image.filename);
        });
      }

      const updateProduct = await ProductModel.updateOne(
        { _id: productID },
        {
          $set: {
            name: name,
            category: category,
            subcategory: subcategory,
            brand: brand,
            price: price,
            quantity: quantity,
            shortDescription: shortDescription,
            description: description,
            rating: rating,
            stars: stars,
            thumbnail: thumbnailImage,
            images: imageArray,
          },
        }
      );
      if (updateProduct !== undefined) {
        return res.status(200).json({
          message: "Item has been successfully Updated ",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;

    const deletedData = await ProductModel.updateOne(
      { _id: productID },
      { $set: { status: 0 } }
    );
    if (deletedData.acknowledged) {
      return res.status(200).json({
        message: "Item has been Succesfully deleted..!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const existProduct = await ProductModel.findOne({ _id: productID });

    if (fs.existsSync("uploads/products/" + existProduct.thumbnail)) {
      fs.unlinkSync("uploads/products/" + existProduct.thumbnail);
    }
    if (existProduct.images) {
      existProduct.images.forEach((image) => {
        fs.unlinkSync("uploads/products/" + image);
      });
    }

    const deletedData = await ProductModel.deleteOne({ _id: productID });
    if (deletedData.acknowledged) {
      return res.status(200).json({
        message: "Item has been Succesfully deleted..!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
