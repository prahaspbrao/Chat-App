import express  from "express"
import dotenv from "dotenv"


const port = process.env.PORT;

const app = express();

app.get("/hi" , (req , res) =>{
    res.send("SignUp Endpoint!!");
})


app.listen(port , () => console.log("server is running on this port 3000 "));

