import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxlength: 32,
    },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = mongoose.model("Category", categorySchema);

export default Category;
