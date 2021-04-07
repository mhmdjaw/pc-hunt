import express from "express";
import { isAuth } from "../controllers/auth";
import {
  addOneItem,
  read,
  badget,
  removeItem,
  addManyItems,
} from "../controllers/cart";

const router = express.Router();

router.get("/cart", isAuth, read);
router.get("/cart/badget", isAuth, badget);
router.post("/cart/add-one", isAuth, addOneItem);
router.post("/cart/add-many", isAuth, addManyItems);
router.delete("/cart/remove-item", isAuth, removeItem);

export default router;
