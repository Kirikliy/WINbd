import express from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "@/controllers/auth.controller";
import { protect } from "@/middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", protect, getUser);

export default router;
