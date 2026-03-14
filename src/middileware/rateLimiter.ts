import rateLimit from "express-rate-limit"

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10, // max 10 login attempts
  message: { success:false, message: "Too many attempts, try later" },
  standardHeaders: true,
  legacyHeaders: false
})
