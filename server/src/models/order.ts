import mongoose, { Document, Model } from "mongoose";
import { addressSchema, IAddress } from "./address";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  item: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  };
  orderId: string;
  orderSummary: {
    productTotal: number;
    taxes: number;
  };
  status?:
    | "Unprocessed"
    | "Processing"
    | "Shipping"
    | "Delivered"
    | "Cancelled";
  address: IAddress;
  paymentMethod: {
    instrumentType: string;
    card?: {
      cardType: string;
      last4: string;
    };
    paypalEmail?: string;
    imageUrl: string;
  };
}

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    item: {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
    orderId: { type: String, required: true },
    orderSummary: {
      productTotal: { type: Number, required: true },
      taxes: { type: Number, required: true },
    },
    status: {
      type: String,
      default: "Unprocessed",
      enum: ["Unprocessed", "Processing", "Shipping", "Delivered", "Cancelled"],
    },
    address: addressSchema,
    paymentMethod: {
      instrumentType: {
        type: String,
        enum: ["paypal", "card"],
        required: true,
      },
      card: { cardType: String, last4: String },
      paypalEmail: String,
      imageUrl: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model("Order", orderSchema);

export default Order;
