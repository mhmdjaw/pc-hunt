import mongoose, { Document, Model } from "mongoose";

const { ObjectId } = mongoose.Types;

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: typeof ObjectId;
  quantity: number;
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
      maxlength: 32,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 200,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model("Product", productSchema);

export default Product;
