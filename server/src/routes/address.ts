import express from "express";
import { isAuth } from "../controllers/auth";
import { read, createOrUpdate } from "../controllers/address";

const router = express.Router();

router.get("/address", isAuth, read);
router.post("/address", isAuth, createOrUpdate);

export default router;
