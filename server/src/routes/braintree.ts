import express from "express";
import { isAuth } from "../controllers/auth";
import { generateToken, processPayment } from "../controllers/braintree";
const router = express.Router();

router.get("/braintree/getToken", isAuth, generateToken);
router.post("/braintree/payment", isAuth, processPayment);

export default router;
