import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { User } from "../models";
import authRouter from "./authRouter";

const router = express.Router();
const { CONFIRM_MAIL_TOKEN_SECRET, CLIENT_ADDR } = process.env;

router.get("/confirm_mail/:token", async (req, res) => {
  try {
    const tokenDecoded = jwt.verify(
      req.params.token,
      CONFIRM_MAIL_TOKEN_SECRET
    );
    await User.updateOne(
      { _id: mongoose.Types.ObjectId(tokenDecoded.id) },
      { email_confirmed: true }
    );
    return res.status(200).redirect(`${CLIENT_ADDR}`);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

export default router;
