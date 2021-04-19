import mongoose, { Model, Document } from "mongoose";

export interface IAddress extends Document {
  user: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
}

export const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    addressLine: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    province: {
      type: String,
      trim: true,
      required: true,
    },
    postalCode: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Address: Model<IAddress> = mongoose.model("Address", addressSchema);

export default Address;
