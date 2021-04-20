import mongoose, { Document, Model } from "mongoose";

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Wishlist: Model<IWishlist> = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
