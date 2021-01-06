import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  productById,
  read,
  remove,
  update,
} from "../controllers/product";

const router = express.Router();

router.get("/product/:productId", read);
router.post("/product/create", isAuth, isAdmin, create);
router.delete("/product/:productId", isAuth, isAdmin, remove);
router.put("/product/:productId", isAuth, isAdmin, update);

router.param("productId", productById);

export default router;
