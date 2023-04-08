import express from "express";

import {
  getAllCategories,
  createCategory,
  getCategoryByID,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/").post(createCategory);
router.route("/").delete(deleteCategory);
router.route("/:id").get(getCategoryByID);
router.route("/:id").put(updateCategory);

export default router;
