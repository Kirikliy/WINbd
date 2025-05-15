import { Request, Response } from "express";
import Article from "@/models/article.model";

export const createArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(article);

    req.app.get("io").emit("articleCreated", article);
  } catch (error: any) {
    console.error("Create article error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { author, title } = req.query;
    const filter: any = {
      $or: [{ author: req.user._id }, { isPublished: true }],
    };

    if (author) {
      filter.author = author;
    }

    if (title) {
      filter.title = { $regex: title };
    }

    const articles = await Article.find(filter)
      .populate("author")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error: any) {
    console.error("Get articles error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getArticleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      $or: [{ author: req.user._id }, { isPublished: true }],
    }).populate("author");

    if (!article) {
      res.status(404).json({ message: "Article not found" });
    } else res.json(article);
  } catch (error: any) {
    console.error("Get article by ID error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const updateArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    const { title, content } = req.body;

    article.title = title || article.title;
    article.content = content || article.content;

    const updatedArticle = await article.save();

    res.json(updatedArticle);

    req.app.get("io").emit("articleUpdated", article);
  } catch (error: any) {
    console.error("Update article error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const publishArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    article.isPublished = true;

    const updatedArticle = await article.save();

    res.json(updatedArticle);

    req.app.get("io").emit("articlePublished", article);
  } catch (error: any) {
    console.error("Update article error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    await article.deleteOne();

    res.json({ message: "Article removed" });

    req.app.get("io").emit("articleRemoved", article);
  } catch (error: any) {
    console.error("Delete article error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
