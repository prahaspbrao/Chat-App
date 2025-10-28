import express  from "express"

const app = express();

app.get("/hi" , (req , res) =>{
    res.send("SignUp Endpoint!!");
})


app.listen(3000 , () => console.log("server is running on this port 3000 "));

