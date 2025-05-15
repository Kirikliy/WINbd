import mongoose, { Schema } from "mongoose";
import { Article } from "@/types/article";

const articleSchema = new Schema<Article>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: Schema.Types.Mixed,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Article>("Article", articleSchema);
