import express from "express";
import { isAuth, isAdmin } from "../controllers/auth";
import { read, update, readSellers } from "../controllers/user";

const router = express.Router();

router.get("/secret", isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.user,
  });
});

router.get("/user", isAuth, read);
router.get("/admin", isAuth, isAdmin, read);
router.put("/user", isAuth, update);
router.get("/brands", readSellers);

export default router;
