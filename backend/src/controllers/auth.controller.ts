import { CookieOptions, Request, Response } from "express";
import User from "@/models/user.model";
import { generateToken } from "@/utils/jwt.utils";

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, login, password } = req.body;

    const userExists = await User.findOne({ login });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      login,
      password,
    });

    if (user) {
      const token = generateToken(user);

      res.cookie("token", token, COOKIE_OPTIONS);

      res.status(201).json({
        user: {
          _id: user._id,
          login: user.login,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user) {
      res.status(401).json({ message: "Invalid login or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid login or password" });
      return;
    }

    const token = generateToken(user);

    res.cookie("token", token, COOKIE_OPTIONS);

    res.json({
      user: {
        _id: user._id,
        login: user.login,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select("_id login");

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
