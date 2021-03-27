import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  productById,
  read,
  remove,
  update,
  listRelated,
  listBySearch,
  image,
  productBySlug,
} from "../controllers/product";

const router = express.Router();

router.get("/product/:productSlug", read);
router.post("/product/create", isAuth, isAdmin, create);
router.delete("/product/:productSlug", isAuth, isAdmin, remove);
router.put("/product/:productSlug", isAuth, isAdmin, update);

router.get("/products/search", listBySearch);
router.get("/products/related/:productSlug", listRelated);
router.get("/product/image/:productSlug", image);

router.param("productId", productById);
router.param("productSlug", productBySlug);

export default router;
