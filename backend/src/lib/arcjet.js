import { ENV } from "./env.js";
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 1000,        // reasonable default
      interval: 60,    // per minute
      identity: "ip",  // per IP rate limit
    }),
  ],
});

export default aj;
