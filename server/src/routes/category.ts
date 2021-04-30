import express from "express";
import { checkProhibitedAction } from "../controllers/user";
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
router.post("/category/create", isAuth, checkProhibitedAction, isAdmin, create);
router.put(
  "/category/:categorySlug",
  isAuth,
  checkProhibitedAction,
  isAdmin,
  update
);
router.delete(
  "/category/:categorySlug",
  isAuth,
  checkProhibitedAction,
  isAdmin,
  remove
);
router.get("/categories", list);

router.param("categorySlug", categoryBySlug);

export default router;
