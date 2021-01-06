import express from "express";
import { isAdmin, isAuth } from "../controllers/auth";
import { create } from "../controllers/category";

const router = express.Router();

router.post("/category/create", isAuth, isAdmin, create);

export default router;
