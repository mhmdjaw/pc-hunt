import mongoose, { Document, Model } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  description: string;
  nickName: string;
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
      required: [true, "Description is required"],
    },
    nickName: {
      type: String,
      required: [true, "Nickname is required"],
    },
  },
  { timestamps: true }
);

const Review: Model<IReview> = mongoose.model("Review", reviewSchema);

export default Review;
