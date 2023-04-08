import Category from "../mongodb/models/Category.js";

const getAllCategories = async (req, res) => {
  const { query } = req;
  try {
    if (query.sort) {
      const categories = await Category.find().sort(JSON.parse(query.sort));
      return res.status(200).json(categories);
    }
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getCategoryByID = async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await Category.findById(id);
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
  console.log(req.body);
  try {
    if (Array.isArray(req.body)) {
      await Category.deleteMany({ _id: { $in: req.body } });
      return res.status(200).json("The category has been deleted!");
    }
    await Category.findByIdAndDelete(req.body);
    return res.status(200).json("The category has been deleted!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findOneAndUpdate({ _id: id }, req.body);
    return res.status(200).json("The category has been updated!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getAllCategories,
  createCategory,
  getCategoryByID,
  deleteCategory,
  updateCategory,
};
