import express from "express";

import {
  getAllProducts,
  createProduct,
  deleteManyProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/").post(createProduct);
router.route("/").delete(deleteManyProducts);
router.route("/:id").delete(deleteProduct);
router.route("/:id").get(getProductByID);
router.route("/:id").put(updateProduct);

export default router;
