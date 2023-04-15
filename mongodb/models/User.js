import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 60,
    },
    email: {
      type: String,
      require: true,
      maxLength: 200,
      unique: true,
    },
    image: {
      type: String,
      require: true,
      maxLength: 200,
    },
    avatar: {
      type: String,
      require: true,
      maxLength: 200,
    },
    firstName: { type: String, maxLength: 200 },
    lastName: { type: String, maxLength: 200 },
    company: { type: String, maxLength: 200 },
    country: { type: String, maxLength: 200 },
    city: { type: String, maxLength: 200 },
    address: { type: String, maxLength: 200 },
    phone: { type: String, maxLength: 200 },
    email: { type: String, maxLength: 200 },
    zipCode: { type: String, maxLength: 200 },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    allOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
