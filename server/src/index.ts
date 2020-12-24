import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv-safe/config";

const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// route middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
