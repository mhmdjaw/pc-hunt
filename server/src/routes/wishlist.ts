import express from "express";
import { isAuth } from "../controllers/auth";
import { add, read, remove } from "../controllers/wishlist";
import { productBySlug } from "../controllers/product";

const router = express.Router();

router.get("/wishlist", isAuth, read);
router.post("/wishlist/:productSlug", isAuth, add);
router.delete("/wishlist/:productSlug", isAuth, remove);

router.param("productSlug", productBySlug);

export default router;
