import express from "express";
import { login, signup, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import arcjetProtection  from "../middlewares/arcjet.middleware.js";

const router = express.Router();

// ✅ Arcjet ONLY for signup/login (high-risk endpoints)
router.post("/signup", arcjetProtection, signup);
router.post("/login", arcjetProtection, login);

router.post("/logout", logout);

// ✅ update profile protected by auth ONLY
router.put("/update-profile", protectRoute, updateProfile);

// ✅ auth check - protected route
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
