import { Request, Response } from "express";
import User from "@/models/user.model";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);
  } catch (error: any) {
    console.error("Get users error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
