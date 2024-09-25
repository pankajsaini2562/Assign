import { Income } from "../models/incomeModel.js";

// Add income
export const addIncome = async (req, res) => {
  const { amount, month, isLocked } = req.body;
  if (!month || amount == null) {
    return res
      .status(400)
      .json({ success: false, msg: "Month and amount are required." });
  }
  try {
    const newIncome = new Income({ userId: req.user, amount, month, isLocked });
    await newIncome.save();
    res.status(201).json({ success: true, msg: "Income added successfully." });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//Get income
export const getIncome = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//lock income per month
export const lockIncome = async (req, res) => {
  const { month } = req.params;
  try {
    const income = await Income.findById(
      { month },
      { isLocked: true },
      { new: true }
    );
    if (!income) return res.status(404).json({ msg: "Income not found" });

    res.json({ success: true, msg: "Income locked successfully." });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
