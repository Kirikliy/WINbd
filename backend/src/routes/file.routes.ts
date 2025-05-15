import express from "express";
import { uploadFile } from "@/controllers/file.controller";
import { protect } from "@/middleware/auth.middleware";
import { upload } from "@/utils/file.utils";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);

export default router;
