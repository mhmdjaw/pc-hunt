import express from "express";
import { isAuth } from "../controllers/auth";
import { addItemToCart, read, badget } from "../controllers/cart";

const router = express.Router();

router.get("/cart", isAuth, read);
router.get("/cart/badget", isAuth, badget);
router.post("/cart/add-one", isAuth, addItemToCart);

export default router;
