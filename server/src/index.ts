import express from "express";
import "dotenv-safe/config";

const app = express();

app.get("/", (req, res) => {
  res.send("hello from node");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
