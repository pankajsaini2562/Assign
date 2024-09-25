import mongoose from "mongoose";
const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: { type: String, unique: true, required: true },

    amount: { type: Number, required: true },
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const Income = mongoose.model("Income", incomeSchema);
