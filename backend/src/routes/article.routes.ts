import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  publishArticle,
  deleteArticle,
} from "@/controllers/article.controller";
import { protect } from "@/middleware/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/create", createArticle);
router.post("/edit/:id", updateArticle);
router.post("/publish/:id", publishArticle);
router.post("/delete/:id", deleteArticle);

export default router;
