import rateLimit from "express-rate-limit";
import { getClientIp } from "./client-ip";

export const globalLimiter = rateLimit({
  windowMs: 60_000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => String(getClientIp(req)),
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60_000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => String(getClientIp(req)),
  message: { error: "Too many attempts. Try again later." },
});
