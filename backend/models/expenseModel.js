import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },

    date: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);
export const Expense = mongoose.model("Expense", expenseSchema);
