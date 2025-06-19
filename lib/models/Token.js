import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

// Capitalize model name and prevent overwrite in dev
const TokenModel = mongoose.models.Token || mongoose.model("Token", TokenSchema);

export default TokenModel;
