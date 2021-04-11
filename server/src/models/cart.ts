import mongoose, { Document, Model } from "mongoose";
import { IProduct } from "./product";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  cartItems: {
    product: mongoose.Types.ObjectId | IProduct;
    quantity: number;
  }[];
}

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity should be 1 or greater"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart: Model<ICart> = mongoose.model("Cart", cartSchema);

export default Cart;
