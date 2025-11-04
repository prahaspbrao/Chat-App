import express from "express";
import { login , signup , logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { updateProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup" ,signup);
router.post("/login" , login);
router.post("/logout" , logout);

router.put("/update-profile" , protectRoute, updateProfile);

router.get("/check" , protectRoute , (req , res) => res.status(200).json(req.user));


export default router;