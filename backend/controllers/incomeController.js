import { Income } from "../models/incomeModel.js";

// Add income
export const addIncome = async (req, res) => {
  const { amount, month } = req.body;
  if (!month || amount == null) {
    return res
      .status(400)
      .json({ success: false, msg: "Month and amount are required." });
  }
  try {
    const newIncome = new Income({ userId: req.user, amount, month });
    await newIncome.save();
    res.status(201).json({ success: true, msg: "Income added successfully." });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//Get income
export const getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({});
    if (!incomes) {
      return res.status(501).json({ success: false, msg: "income not found" });
    }
    res.status(201).json({ success: true, incomes });
  } catch (error) {
    res.status(501).json({ msg: error.message, incomes });
  }
};

//lock income per month
export const lockIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndUpdate(
      id,

      { isLocked: true },
      { new: true }
    );
    if (!income) return res.status(404).json({ msg: "Income not found" });

    res.json({ success: true, income, msg: "Income locked successfully." });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
