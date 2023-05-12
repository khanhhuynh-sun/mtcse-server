import Product from "../mongodb/models/Product.js";

const search = async (req, res) => {
  const { object } = req.params;
  let result = {};
  try {
    switch (object) {
      case "products":
        const { title } = req.query;
        result = await Product.find({
          title: { $regex: title, $options: "i" },
        }).populate("category");
        break;
      default:
        throw new Error("wrong params!");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { search };
