import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { Server } from "socket.io";
import { connectDB } from "@/config/db";
import authRoutes from "@/routes/auth.routes";
import articleRoutes from "@/routes/article.routes";
import fileRoutes from "@/routes/file.routes";
import userRoutes from "@/routes/user.routes";
import { errorHandler } from "@/middleware/error.middleware";
const http = require("http");

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:8001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Новое подключение:", socket.id);
});

connectDB();

app.set("io", io);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8001",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
