import express from "express";

import {
  getAllOrders,
  getOrderByUserId,
  createOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").get(getAllOrders);
router.route("/").post(createOrder);
router.route("/:id").get(getOrderByUserId);

export default router;
