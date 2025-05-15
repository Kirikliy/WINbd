import jwt from "jsonwebtoken";
import { User } from "@/types/user";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user._id,
      login: user.login,
    },
    JWT_SECRET as jwt.Secret,
    {
      expiresIn: JWT_EXPIRES_IN as `${number}`,
    }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
