import mongoose from "mongoose";
const caegorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
});

export const Category = mongoose.model("Category", caegorySchema);
