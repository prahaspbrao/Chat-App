import express  from "express"
import dotenv from "dotenv"
dotenv.config();

import router from "./routes/auth.route.js"

const port = process.env.PORT;
const app = express();

app.use("/" , router);
app.use("/api/auth" , router)


app.listen(port , () => console.log("server is running on this port : "+port + " \nhttp://localhost:"+port+"/" ));

