import multer from "multer";
import fs from "fs";
import { storage } from "../utils/multerFilter";
import SubcategoryModel from "../models/subcategory.model";

const upload = multer({
  storage: storage,
});

export const addSubCategory = (req, res) => {
  try {
    // we use multer here
    const uploadCategoryData = upload.single("image");

    uploadCategoryData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const { name, description, category } = req.body;
      let image = null;
      if (req.file) {
        image = req.file.filename;
      }
      const saveCategory = new SubcategoryModel({
        name: name,
        description: description,
        image: image,
        category: category,
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
export const getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubcategoryModel.find({ status: 1 }).populate(
      "category"
    );
    if (subcategories) {
      return res.status(200).json({
        data: subcategories,
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
export const getSubCategory = async (req, res) => {
  try {
    const subCategoryID = req.params.subcategory_id;
    const subCategoryData = await SubcategoryModel.findOne({
      _id: subCategoryID,
    });
    if (subCategoryData) {
      return res.status(200).json({
        data: subCategoryData,
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
export const updateSubCategory = async (req, res) => {
  try {
    const updateSubCategoryData = upload.single("image");
    updateSubCategoryData(req, res, async function (err) {
      if (err) {
        return (
          res.status(400),
          json({
            message: err.message,
          })
        );
      }
      const { name, description, category } = req.body;
      const subCategoryID = req.params.subcategory_id;
      const existCategory = await SubcategoryModel.findOne({
        _id: subCategoryID,
      });

      let image = existCategory.image;
      if (req.file) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/subcategories/" + existCategory.image)) {
          fs.unlinkSync("./uploads/subcategories/" + existCategory.image);
        }
      }
      const updatedCategory = await SubcategoryModel.updateOne(
        { _id: subCategoryID },
        {
          $set: {
            name: name,
            description: description,
            category: category,
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
    return res.status(500).jason({
      message: error.message,
    });
  }
};
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryID = req.params.subcategory_id;
    const deletedSubCategory = await SubcategoryModel.updateOne(
      { _id: subCategoryID },
      {
        $set: {
          status: 0,
        },
      }
    );
    if (deletedSubCategory.acknowledged) {
      return res.status(200).json({
        data: deletedSubCategory,
        message: "Item has been Successfully Deleted..!",
      });
    }
  } catch (error) {
    return res.status(500).jason({
      message: error.message,
    });
  }
};
export const removeSubCategory = async (req, res) => {
  try {
    const subCategoryID = req.params.subcategory_id;
    const subCategoryData = await SubcategoryModel.findOne({
      _id: subCategoryID,
    });

    if (fs.existsSync("uploads/subcategories/" + subCategoryData.image)) {
      fs.unlinkSync("uploads/subcategories/" + subCategoryData.image);
    }

    const deletedSubCategory = await SubcategoryModel.deleteOne({
      _id: subCategoryID,
    });

    if (deletedSubCategory.acknowledged) {
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
