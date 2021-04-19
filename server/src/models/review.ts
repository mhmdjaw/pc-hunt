import mongoose, { Document, Model } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  description: string;
  nickname: string;
  verified: boolean;
}

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "Rating is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
      required: [true, "Nickname is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Review: Model<IReview> = mongoose.model("Review", reviewSchema);

export default Review;
