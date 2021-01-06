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

export default router;
