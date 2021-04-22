import mongoose, { Document, Model } from "mongoose";
import { slugify } from "../helpers";

export interface IPost extends Document {
  postedBy: string;
  title: string;
  slug: string;
  content: string;
}

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      index: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.path("title").validate(async (title: string) => {
  const exists = await mongoose.models.Post.exists({ title });
  return !exists;
}, "A post with this title already exists");

postSchema.pre("save", async function (this: IPost, next) {
  this.slug = slugify(this.title);
  next();
});

const Post: Model<IPost> = mongoose.model("Post", postSchema);

export default Post;
