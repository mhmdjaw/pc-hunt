import mongoose, { Document, Model } from "mongoose";
import { slugify } from "../helpers";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parent: mongoose.Schema.Types.ObjectId;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxlength: 32,
    },
    slug: {
      type: String,
      index: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

categorySchema.path("name").validate(async (name: string) => {
  const nameCount = await mongoose.models.Category.countDocuments({ name });
  return !nameCount;
}, "Category already exists");

categorySchema.pre("save", async function (this: ICategory, next) {
  this.slug = slugify(this.name);
  next();
});

const Category: Model<ICategory> = mongoose.model("Category", categorySchema);

export default Category;
