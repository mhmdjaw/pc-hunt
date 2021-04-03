import express from "express";
import { isAuth } from "../controllers/auth";
import {
  addItemToCart,
  read,
  badget,
  removeItemFromCart,
  addItemsToCart,
} from "../controllers/cart";

const router = express.Router();

router.get("/cart", isAuth, read);
router.get("/cart/badget", isAuth, badget);
router.post("/cart/add-one", isAuth, addItemToCart);
router.post("/cart/add-many", isAuth, addItemsToCart);
router.delete("/cart/remove-item", isAuth, removeItemFromCart);

export default router;
