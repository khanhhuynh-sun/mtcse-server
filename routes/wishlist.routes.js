import express from "express";

import { updateWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.route("/").put(updateWishlist);

export default router;
