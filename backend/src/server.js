import express  from "express"
import dotenv from "dotenv"
dotenv.config();

import AuthRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"

const port = process.env.PORT;
const app = express();

// app.use("/" , router);
app.use("/api/auth" , AuthRoute);
app.use("/api/messages" , messageRoute);



app.listen(port , () => console.log("server is running on this port : "+port + " \nhttp://localhost:"+port+"/" ));

