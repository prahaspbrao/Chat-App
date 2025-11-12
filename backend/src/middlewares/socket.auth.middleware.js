import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { ENV } from "../lib/env.js";

export const socketAUthMiddleware = async (socket, next) => {
  try {
    // extract token from http-only cookies
    const token = socket.handshake.headers.cookie
      ?.split(";")
      .find((row) => row.startsWith("jwt"))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected : No token provided..");
      return next(new Error("Unauthorized - No token provided"));
    }

    // verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      console.log("Socket connection rejected : Invalid token..");
      return next(new Error("Unautharized - Invalid token"));
    }

    // find user
    const user = User.findById(decoded.userId).select("-password");
    
    if(!user){
        console.log("Socket connection rejected : User not found!!");
        return next(new Error("User not found!!"));
    }

    // Attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authentiacted for user : ${user.fullName} (${user._id})`);
    

    next();
  } catch (error) {
    console.log("Error in socket authentication : ", error.message);
    next(new Error("Unathorized - Authentication falied"))
    
  }
};
