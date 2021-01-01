import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import options from "../helpers/passport-local-mongoose-options";
import findOrCreate from "mongoose-findorcreate";

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

    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtual field

// userSchema
//   .virtual("password")
//   .set(function (
//     this: {
//       hashed_password: string;
//       salt: string;
//       _password: string;
//       encryptPassword: (password: string) => string;
//     },
//     password: string
//   ) {
//     this._password = password;
//     this.salt = uuidv4();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function (this: { _password: string }) {
//     return this._password;
//   });

// userSchema.methods = {
//   encryptPassword: function (this: { salt: string }, password: string): string {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
// };

// email validation
userSchema.path("email").validate((email: string) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}, "Please enter a valid email");

userSchema.plugin(passportLocalMongoose, options);
userSchema.plugin(findOrCreate);

export default mongoose.model("User", userSchema as PassportLocalSchema);
