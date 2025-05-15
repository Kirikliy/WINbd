import { Request, Response } from "express";
import File from "@/models/file.model";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const { originalname, filename, mimetype, size, path: filePath } = req.file;
    const isPublic = req.body.isPublic === "true";

    const file = await File.create({
      filename,
      originalName: originalname,
      path: filePath,
      mimetype,
      size,
      uploadedBy: req.user._id,
      isPublic,
    });

    res.status(201).json({
      url: `${req.protocol}://${req.get("host")}/${filePath}`,
      name: file.filename,
      size,
    });
  } catch (error: any) {
    console.error("File upload error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
