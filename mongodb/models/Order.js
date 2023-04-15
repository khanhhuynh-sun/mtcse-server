import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    firstName: { type: String, maxLength: 200, require: true },
    lastName: { type: String, maxLength: 200, require: true },
    company: { type: String, maxLength: 200 },
    country: { type: String, maxLength: 200, require: true },
    city: { type: String, maxLength: 200, require: true },
    address: { type: String, maxLength: 200, require: true },
    phone: { type: String, maxLength: 200, require: true },
    email: { type: String, maxLength: 200, require: true },
    zipCode: { type: String, maxLength: 200, require: true },
    totalPrice: { type: Number },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        size: { type: String, maxLength: 200 },
        amount: { type: String, maxLength: 200 },
        price: { type: Number },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
