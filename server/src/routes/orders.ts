import express from "express";
import { isAuth } from "../controllers/auth";
import { read, search } from "../controllers/order";

const router = express.Router();

router.get("/orders", isAuth, read);
router.get("/orders/:search", isAuth, search);

export default router;
