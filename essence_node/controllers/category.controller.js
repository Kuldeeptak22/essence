import multer from "multer";
import fs from "fs";
import { storage } from "../utils/multerFilter";
import CategoryModel from "../models/category.model";

const upload = multer({
  storage: storage,
});

export const addCategory = (req, res) => {
  try {
    // we use multer here
    const uploadCategoryData = upload.single("image");

    uploadCategoryData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const { name, description } = req.body;

      let image = null;
      if (req.file != undefined) {
        image = req.file.filename;
      }
      const saveCategory = new CategoryModel({
        name: name,
        description: description,
        image: image,
      });
      saveCategory.save();
      if (saveCategory) {
        return res.status(201).json({
          data: saveCategory,
          message: "Item has been added Successfully.",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({ status: 1 });
    if (categories) {
      return res.status(200).json({
        data: categories,
        message: "SuccessFully Fetched",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;
    const categoryData = await CategoryModel.findOne({
      _id: categoryID,
      status: 1,
    });
    if (categoryData) {
      return res.status(200).json({
        data: categoryData,
        message: "SuccessFully Fetched Single Data",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const updateCategoryData = upload.single("image");
    updateCategoryData(req, res, async function (err) {
      if (err) {
        return (
          res.status(400).
          json({
            message: err.message,
          })
        );
      }
      const { name, description } = req.body;
      const categoryID = req.params.category_id;
      const existCategory = await CategoryModel.findOne({
        _id: categoryID,
      });

      let image = existCategory.image;
      if (req.file) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/categories/" + existCategory.image)) {
          fs.unlinkSync("./uploads/categories/" + existCategory.image);
        }
      }
      const updatedCategory = await CategoryModel.updateOne(
        { _id: categoryID },
        {
          $set: {
            name: name,
            description: description,
            image: image,
          },
        }
      );
      if (updatedCategory.matchedCount) {
        return res.status(200).json({
          message: "Item has been Successfully Updated..!.",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;
    const deletedCategory = await CategoryModel.updateOne(
      { _id: categoryID },
      {
        $set: {
          status: 0,
        },
      }
    );
    if (deletedCategory.acknowledged) {
      return res.status(200).json({
        data: deletedCategory,
        message: "Item has been Successfully Deleted..!",
      });
    }
  } catch (error) {
    return res.status(500).jason({
      message: error.message,
    });
  }
};
export const removeCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;
    const categoryData = await CategoryModel.findOne({
      _id: categoryID,
    });

    if (fs.existsSync("uploads/categories/" + categoryData.image)) {
      fs.unlinkSync("uploads/categories/" + categoryData.image);
    }

    const deletedCategory = await CategoryModel.deleteOne({
      _id: categoryID,
    });

    if (deletedCategory.acknowledged) {
      return res.status(200).json({
        message: "Item has been Successfully Deleted..!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
