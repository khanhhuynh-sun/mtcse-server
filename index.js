import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from "./routes/order.routes.js";
import searchRouter from "./routes/search.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "OK" });
});

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/search", searchRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);

    app.listen(8080, () =>
      console.log("Server stated on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
