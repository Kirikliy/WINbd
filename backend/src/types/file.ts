import mongoose from "mongoose";

export type File = {
  _id: mongoose.Types.ObjectId;
  filename: string;
  originalName: string;
  path: string;
  mimetype: string;
  size: number;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
