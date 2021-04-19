import mongoose, {
  Document,
  PassportLocalSchema,
  PassportLocalModel,
} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { options } from "../helpers";
import findOrCreate from "mongoose-findorcreate";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  role: number;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: 32,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// email validation
userSchema.path("email").validate((email: string) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}, "Please enter a valid email");

userSchema.plugin(passportLocalMongoose, options);
userSchema.plugin(findOrCreate);

const User: PassportLocalModel<IUser> = mongoose.model(
  "User",
  userSchema as PassportLocalSchema
);

export default User;
