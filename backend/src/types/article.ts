import mongoose from "mongoose";

export type Content = {
  time: number;
  version: string;
  blocks: Array<unknown>;
};

export type Article = {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: Content | null;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};
