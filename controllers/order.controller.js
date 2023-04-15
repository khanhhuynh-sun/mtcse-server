import Order from "../mongodb/models/Order.js";
import Product from "../mongodb/models/Product.js";
import User from "../mongodb/models/User.js";

const getAllOrders = async (req, res) => {
  const { find = null, sort = null, page = null, perPage = null } = req.query;

  try {
    const order = await Order.find(JSON.parse(find))
      .populate("products")
      .populate("user")
      .limit(perPage)
      .skip(perPage * page)
      .sort(JSON.parse(sort));
    const length = await Order.count();

    return res.status(200).json({ data: order, length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.find({ user: id })
      .populate("products")
      .populate("user");
    res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = {
      ...req.body,
      totalPrice: req.body.products.reduce(
        (totalPrice, currproduct) =>
          totalPrice + currproduct.amount * currproduct.price,
        0
      ),
    };
    const order = await Order.create(newOrder);

    console.log(order);

    await User.findByIdAndUpdate(order.user, {
      $push: { allOrders: order._id },
    });

    order.products.forEach(async (product) => {
      await Product.findByIdAndUpdate(product.product, {
        $push: { orderList: order._id },
      });
    });

    return res.status(200).send("The order has been created!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getAllOrders, getOrderByUserId, createOrder };
