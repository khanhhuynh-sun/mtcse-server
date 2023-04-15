import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      maxLength: 60,
    },
    description: {
      type: String,
      require: true,
      maxLength: 200,
    },
    images: {
      type: [String],
      require: true,
    },
    color: {
      type: String,
      require: true,
      maxLength: 60,
    },
    sizes: {
      type: [
        {
          name: { type: String, require: true, maxLength: 10 },
          amount: { type: Number, require: true },
          price: { type: Number, require: true },
        },
      ],
    },
    isTrending: {
      type: Boolean,
    },
    isBestSeller: {
      type: Boolean,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    wishListBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    orderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
