import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} from "../controllers/category";

const router = express.Router();

router.get("/category/:categoryId", read);
router.post("/category/create", isAuth, isAdmin, create);
router.put("/category/:categoryId", isAuth, isAdmin, update);
router.delete("/category/:categoryId", isAuth, isAdmin, remove);
router.get("/categories", list);

router.param("categoryId", categoryById);

export default router;
