import express from "express";
import "dotenv-safe/config";
import cors from "cors";
import mongoose, { CallbackError } from "mongoose";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/product";
import cartRoutes from "./routes/cart";
import addressRoute from "./routes/address";
import braintreeRoute from "./routes/braintree";
import orderRouter from "./routes/orders";
import reviewRouter from "./routes/review";
import wishlistRouter from "./routes/wishlist";
import postRouter from "./routes/post";
import contactUsRouter from "./routes/contact-us";
import User, { IUser } from "./models/user";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { mongooseConfig } from "./helpers";
import morgan from "morgan";

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL,
  })
);
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1800000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// db
mongoose
  .connect(process.env.MONGO_URI, mongooseConfig)
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// passport config
passport.use(User.createStrategy());

passport.serializeUser((user: IUser, done) => {
  console.log(user.id);

  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);

  User.findById(id, (err: CallbackError, user: IUser) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (_accessToken, _refreshToken, profile, cb) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (User as any).findOrCreate(
        {
          email: (profile.emails as { value: string }[])[0].value,
        },
        { name: profile.name?.givenName },
        (err: Error, user: IUser) => {
          return cb(err, user);
        }
      );
    }
  )
);

// route middleware
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoute);
app.use("/api", braintreeRoute);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/api", wishlistRouter);
app.use("/api", postRouter);
app.use("/api", contactUsRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
