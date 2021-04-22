import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import {
  create,
  list,
  listSeller,
  postBySlug,
  read,
  remove,
} from "../controllers/post";

const router = express.Router();

router.post("/post", isAuth, isAdmin, create);
router.delete("/post/:postSlug", isAuth, isAdmin, remove);
router.get("/post/:postSlug", read);
router.get("/posts", list);
router.get("/posts/seller", isAuth, isAdmin, listSeller);

router.param("postSlug", postBySlug);

export default router;
