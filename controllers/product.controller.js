import Product from "../mongodb/models/Product.js";
import Category from "../mongodb/models/Category.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { isValidImageUrl } from "../utils/ultils.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProducts = async (req, res) => {
  const { sort = null, page = null, perPage = null } = req.query;
  try {
    const products = await Product.find()
      .populate("category")
      .limit(perPage)
      .skip(perPage * page)
      .sort(JSON.parse(sort));
    const length = await Product.count();

    return res.status(200).json({ data: products, length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const imageUrls = [];
    await Promise.all(
      req.body.imagesList.map(async (image) => {
        const imageData = await cloudinary.uploader.upload(image, {
          folder: "mtcse",
          public_id: `${Date.now()}`,
          resource_type: "auto",
        });
        imageUrls.push(imageData.url);
      })
    );

    const product = await Product.create({ ...req.body, images: imageUrls });

    await Category.findByIdAndUpdate(product.category, {
      $push: { allProduct: product.id },
    });

    return res.status(200).send({ ...req.body, images: imageUrls });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyProducts = async (req, res) => {
  try {
    await Product.deleteMany({ _id: { $in: req.query.ids } });
    return res.status(200).json("The product has been deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id).populate("category");
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    await Category.findByIdAndUpdate(product.category, {
      $pull: { allProduct: id },
    });
    await Product.findByIdAndDelete(id);

    return res.status(200).json("The product has been deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    //update ref from categories
    const oldProduct = await Product.findById(id);
    await Category.findByIdAndUpdate(oldProduct.category, {
      $pull: { allProduct: id },
    });
    await Category.findByIdAndUpdate(req.body.category, {
      $addToSet: { allProduct: id },
    });

    //update product
    const imageUrls = [];
    await Promise.all(
      req.body.imagesList.map(async (image) => {
        if (isValidImageUrl(image)) {
          imageUrls.push(image);
        } else {
          const imageData = await cloudinary.uploader.upload(image, {
            folder: "mtcse",
            public_id: `${Date.now()}`,
            resource_type: "auto",
          });
          imageUrls.push(imageData.url);
        }
      })
    );
    await Product.findOneAndUpdate(
      { _id: id },
      { ...req.body, images: imageUrls }
    );
    return res.status(200).json("The product has been updated!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getAllProducts,
  createProduct,
  deleteManyProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
};
