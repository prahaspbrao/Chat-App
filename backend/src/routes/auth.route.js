import express from "express";
import signup from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup" ,signup);

router.get("", (req , res) =>{
    res.send("Home Page");
})

router.get("/login" , (req , res) =>{
    res.send("Login endPoint!!");
})

router.get("/logout" , (req , res) =>{
    res.send("Logout endPoint!!");
})

export default router;