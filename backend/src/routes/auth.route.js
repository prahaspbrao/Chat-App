import express from "express";

const router = express.Router();

router.get("/signup" , (req , res) =>{
    res.send("SignUp endPoint!!");
})

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