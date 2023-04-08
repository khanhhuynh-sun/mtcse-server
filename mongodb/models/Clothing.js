import mongoose from "mongoose";

const ClothingSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

export default mongoose.models.Clothing ||
  mongoose.model("Clothing", ClothingSchema);
