import express from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "@/controllers/auth.controller";
import { protect } from "@/middleware/auth.middleware";
import { body } from "express-validator";

const router = express.Router();

const loginValidation = body("login").isString().isLength({ min: 4 });
const passwordValidation = body("password")
  .matches(/^[a-zA-Z0-9]+$/)
  .notEmpty();

router.post("/register", loginValidation, passwordValidation, register);
router.post("/login", loginValidation, passwordValidation, login);
router.post("/logout", logout);
router.get("/user", protect, getUser);

export default router;
