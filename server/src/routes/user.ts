import express from "express";
import { isAuth, isAdmin } from "../controllers/auth";
import { read, update } from "../controllers/user";

const router = express.Router();

router.get("/secret", isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.user,
  });
});

router.get("/user", isAuth, read);
router.put("/user", isAuth, update);

export default router;
