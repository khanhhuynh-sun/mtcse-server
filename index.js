import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

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
