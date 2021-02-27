import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listByFilters,
  listBySearch,
  image,
} from "../controllers/product";

const router = express.Router();

router.get("/product/:productId", read);
router.post("/product/create", isAuth, isAdmin, create);
router.delete("/product/:productId", isAuth, isAdmin, remove);
router.put("/product/:productId", isAuth, isAdmin, update);

router.get("/products", list);
router.get("/products/search", listBySearch);
router.get("/products/related/:productId", listRelated);
router.post("/products/filters", listByFilters);
router.get("/product/image/:productId", image);

router.param("productId", productById);

export default router;
