import express from "express";
import dotenv from "dotenv";
import path from "path";
import AuthRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser"

const app = express();
const port = ENV.PORT || 3000;
const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/messages", messageRoute);

// Production deployment setup
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const HOST = "0.0.0.0"; 

// Server start
app.listen(port,HOST ,  () => {
  console.log(
    `✅ Server running on port ${port}\n👉 http://localhost:${port}/`
  );
  connectDB();
});
