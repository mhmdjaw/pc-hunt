import mongoose, { Document, Model } from "mongoose";
import { slugify } from "../helpers";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  categories: mongoose.Schema.Types.ObjectId[];
  quantity: number;
  sold: number;
  image?: {
    data: Buffer;
    contentType: string;
  };
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price should be greater than 0"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
      },
    ],
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity should be 0 or greater"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (this: IProduct, next) {
  this.slug = slugify(this.name);
  next();
});

const Product: Model<IProduct> = mongoose.model("Product", productSchema);

export default Product;
