import User from "../mongodb/models/User.js";
import Product from "../mongodb/models/Product.js";

const updateWishlist = async (req, res) => {
  const { productId, userId, type } = req.body.params;

  try {
    if (type === "add") {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { wishlist: productId },
      });
      await Product.findByIdAndUpdate(productId, {
        $addToSet: { wishListBy: userId },
      });
    }

    if (type === "remove") {
      await User.findByIdAndUpdate(userId, {
        $pull: { wishlist: productId },
      });
      await Product.findByIdAndUpdate(productId, {
        $pull: { wishListBy: userId },
      });
    }

    return res.status(200).json("The wishlist has been updated!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { updateWishlist };
