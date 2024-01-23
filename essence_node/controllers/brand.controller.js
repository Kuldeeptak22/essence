import multer from "multer";
import fs from "fs";
import { storage } from "../utils/multerFilter";
import BrandModel from "../models/brand.model";

const upload = multer({
  storage: storage,
});

export const addBrand = (req, res) => {
  try {
    const uploadBrandData = upload.single("image");
    uploadBrandData(req, res, function (err) {
      if (err) {
        return (
          res.status(400),
          json({
            message: err.message,
          })
        );
      }
      const { name } = req.body;

      let image = null;
      if (req.file) {
        image = req.file.filename;
      }
      const saveBrand = new BrandModel({
        name: name,
        image: image,
      });
      saveBrand.save();
      if (saveBrand) {
        return res.status(201).json({
          data: saveBrand,
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
export const getBrands = async (req, res) => {
  try {
    const brandsData = await BrandModel.find({ status: 1 });
    if (brandsData) {
      return res.status(200).json({
        data: brandsData,
        message: "Success",
        filepath: `${process.env.BASE_URL}/uploads`,
        total: brandsData.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getBrand = async (req, res) => {
  try {
    const brandID = req.params.brand_id;
    const brandData = await BrandModel.findOne({ status: 1, _id: brandID });
    if (brandData) {
      return res.status(200).json({
        data: brandData,
        message: "Success",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateBrand = async (req, res) => {
  try {
    const uploadBrandData = upload.single("image");
    uploadBrandData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const brandID = req.params.brand_id;
      const { name } = req.body;

      const existBrand = await BrandModel.findOne({ _id: brandID });

      let img = existBrand.image;
      if (req.file) {
        img = req.file.filename;
        if (fs.existsSync("./uploads/brands/" + existBrand.image)) {
          fs.unlinkSync("./uploads/brands/" + existBrand.image);
        }
      }

      const updateBrand = await BrandModel.updateOne(
        { _id: brandID },
        {
          $set: {
            name: name,
            image: img,
          },
        }
      );

      if (updateBrand.matchedCount) {
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
export const deleteBrand = async (req, res) => {
  try {
    const brandID = req.params.brand_id;

    const deletedBrand = await BrandModel.updateOne(
      { _id: brandID },
      {
        $set: {
          status: 0,
        },
      }
    );
    if (deletedBrand.acknowledged) {
      return res.status(200).json({
        message: "Item has been Successfully Deleted..!",
      });
    }
  } catch (error) {
    return res.status(500).jason({
      message: error.message,
    });
  }
};
export const removeBrand = async (req, res) => {
  try {
    const brandID = req.params.brand_id;
    const existBrand = await BrandModel.findOne({ _id: brandID });
    if (fs.existsSync("./uploads/brands/" + existBrand.image)) {
      fs.unlinkSync("./uploads/brands/" + existBrand.image);
    }
    const deletedData = await BrandModel.deleteOne({ _id: brandID });
    if (deletedData.acknowledged) {
      return res.status(200).json({
        message: "Item has been Successfully Updated..!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
