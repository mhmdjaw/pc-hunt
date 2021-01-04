import express from "express";
import {
  signup,
  login,
  googleLogin,
  googleAuthResult,
  logout,
} from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/google", googleLogin);
router.get("/google/secrets", googleAuthResult);
router.get("/logout", logout);
router.get("/hello", (req, res) => {
  console.log(req.isAuthenticated());

  res.json({ message: "this is a random route", user: req.user });
});

export default router;
