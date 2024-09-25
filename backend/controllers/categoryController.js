import { Category } from "../models/categoryModel.js";
export const addCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user;
  try {
    const category = new Category({ userId, name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

export const getCategory = async (req, res) => {
  const userId = req.user;
  try {
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
