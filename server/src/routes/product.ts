import express from "express";
import { checkProhibitedAction } from "../controllers/user";
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
  listSeller,
  searchSeller,
} from "../controllers/product";

const router = express.Router();

router.get("/product/:productSlug", read);
router.post("/product/create", isAuth, checkProhibitedAction, isAdmin, create);
router.delete(
  "/product/:productSlug",
  isAuth,
  checkProhibitedAction,
  isAdmin,
  remove
);
router.put(
  "/product/:productSlug",
  isAuth,
  checkProhibitedAction,
  isAdmin,
  update
);

router.get("/products/search", listBySearch);
router.get("/products/related/:productSlug", listRelated);
router.get("/product/image/:productSlug", image);
router.get("/products/seller", isAuth, isAdmin, listSeller);
router.get("/products/seller/:search", isAuth, isAdmin, searchSeller);

router.param("productId", productById);
router.param("productSlug", productBySlug);

export default router;
