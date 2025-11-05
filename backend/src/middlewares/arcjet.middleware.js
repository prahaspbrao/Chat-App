import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    // 🧠 1. Skip Arcjet completely in development
    if (process.env.NODE_ENV === "development") {
      console.log("⚙️  Arcjet skipped in development mode");
      return next();
    }

    // 🧠 2. Pass explicit identity (avoid localhost fallback)
    const decision = await aj.protect(req, { identity: req.ip });

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded, Please try again!!",
          details: decision.reason?.toString(),
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied by security policy!!",
        });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy",
        });
      }
    }

    // 🧠 3. Spoofed bot detection
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Malicious bot activity detected!!",
        error: "Spoofed bot detected!!",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet protection Error:", error);
    next();
  }
};
