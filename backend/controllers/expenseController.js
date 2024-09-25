import { Expense } from "../models/expenseModel.js";
import { Income } from "../models/incomeModel.js";
// Add expenses
export const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const income = await Income.findOne({
      userId: req.user,
      month: new Date(date)
        .toLocaleString("default", {
          month: "long",
        })
        .toLowerCase(),
    });
    if (!income)
      return res.status(404).json({ msg: "Income for this month not found" });
    if (income.isLocked)
      return res.status(400).json({ msg: "Income for this month is locked" });

    if (income.amount < amount)
      return res.status(400).json({ msg: "Insufficient income" });

    const expense = new Expense({
      userId: req.user,
      title,
      amount,
      category,
      date,
    });
    await expense.save();

    income.amount -= amount;
    await income.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//edit expense
export const editExpense = async (req, res) => {
  const { id } = req.params;
  const editExpense = {
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
  };
  try {
    const editedExpense = await Expense.findByIdAndUpdate(id, editExpense, {
      new: true,
    });

    res.json({ success: true, editedExpense });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//delete expenses
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ msg: "Expense not found" });

    res.json({ msg: "Expense removed" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
