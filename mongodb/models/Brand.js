import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
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

export default mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
