import express from "express";
import { isAuth, isAdmin } from "../controllers/auth";

const router = express.Router();

router.get("/secret", isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;
