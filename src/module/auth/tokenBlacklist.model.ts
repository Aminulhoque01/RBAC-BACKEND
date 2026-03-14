import { Schema, model } from "mongoose"

const tokenBlacklistSchema = new Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }
})

export const TokenBlacklist = model("TokenBlacklist", tokenBlacklistSchema)
