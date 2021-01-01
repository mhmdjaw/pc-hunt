import express from "express";
import {
  signup,
  login,
  googleLogin,
  googleAuthResult,
} from "../controllers/user";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/auth/google", googleLogin);

router.get("/auth/google/secrets", googleAuthResult);

export default router;
