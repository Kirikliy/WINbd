import express from "express";
import { getUsers } from "@/controllers/user.controller";
import { protect } from "@/middleware/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getUsers);

export default router;
