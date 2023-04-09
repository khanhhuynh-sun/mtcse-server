import Category from "../mongodb/models/Category.js";

const getAllCategories = async (req, res) => {
  const { sort = null, page = null, perPage = null } = req.query;
  try {
    const categories = await Category.find()
      .limit(perPage)
      .skip(perPage * page)
      .sort(JSON.parse(sort));
    const length = await Category.count();

    return res.status(200).json({ data: categories, length });
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

const deleteManyCategories = async (req, res) => {
  try {
    await Category.deleteMany({ _id: { $in: req.query.ids } });
    return res.status(200).json("The category has been deleted!");
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
  const { id } = req.params;
  try {
    if (Array.isArray(req.body)) {
      await Category.deleteMany({ _id: { $in: req.body } });
      return res.status(200).json("The category has been deleted!");
    }
    await Category.findByIdAndDelete(id);
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
  deleteManyCategories,
  getCategoryByID,
  deleteCategory,
  updateCategory,
};
