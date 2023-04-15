import User from "../mongodb/models/User.js";

const getAllUsers = async (req, res) => {
  const { find = null, sort = null, page = null, perPage = null } = req.query;

  try {
    const user = await User.find(JSON.parse(find))
      .limit(perPage)
      .skip(perPage * page)
      .sort(JSON.parse(sort));
    const length = await User.count();

    return res.status(200).json({ data: user, length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate("wishlist")
      .populate("allOrders");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserOrderByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email })
      .populate("allOrders")
      .populate({
        path: "allOrders",
        populate: {
          path: "products.product",
          model: "Product",
        },
        options: { sort: { createdAt: -1 } },
      });

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findOneAndUpdate({ _id: id }, { ...req.body });
    return res.status(200).json("The user has been updated!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUserByID, updateUser, getUserOrderByEmail };
