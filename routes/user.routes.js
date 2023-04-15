import express from "express";

import {
  getAllUsers,
  getUserByID,
  updateUser,
  getUserOrderByEmail,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserByID);
router.route("/:id").put(updateUser);
router.route("/order/:email").get(getUserOrderByEmail);

export default router;
