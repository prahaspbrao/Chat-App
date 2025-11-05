import express from "express";
import { getAllContacts , getMessagesByUserId , sendMessage , getChatPartners} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const router = express.Router();

// middleware
router.use(arcjetProtection , protectRoute)

router.get("/contacts"  , getAllContacts);
router.get("/chats" , getChatPartners);
router.get("/:id" ,  getMessagesByUserId);
router.post('/send/:id'  ,  sendMessage);



export default router;