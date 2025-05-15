import mongoose from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
};
