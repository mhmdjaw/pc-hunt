import express from "express";
import { isAuth } from "../controllers/auth";
import { productBySlug } from "../controllers/product";
import { createOrUpdate, list, remove } from "../controllers/review";

const router = express.Router();

router.post("/review/:productSlug", isAuth, createOrUpdate);
router.delete("/review/:productSlug", isAuth, remove);
router.get("/reviews/:productSlug", list);

router.param("productSlug", productBySlug);

export default router;
