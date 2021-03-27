import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  read,
  update,
  remove,
  list,
  categoryBySlug,
} from "../controllers/category";

const router = express.Router();

router.get("/category/:categorySlug", read);
router.post("/category/create", isAuth, isAdmin, create);
router.put("/category/:categorySlug", isAuth, isAdmin, update);
router.delete("/category/:categorySlug", isAuth, isAdmin, remove);
router.get("/categories", list);

router.param("categorySlug", categoryBySlug);

export default router;
