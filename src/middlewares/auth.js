import { AuthenticationError } from "apollo-server-express";

import { User, Session } from "../models";

const message = "Wrong Details. Try again";
const { SESSION_NAME } = process.env;

export const attmeptSignIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError(message);
  }
  const check = await user.passwordMatch(password);
  if (!check) {
    throw new AuthenticationError(message);
  }
  return user;
};

export const signedIn = req => {
  if (req.session.passport && req.session.passport.user.userId)
    return req.session.passport.user.userId;
      console.log("from signin middleware", req.session.userId);
      console.log("from express-session deprecated", req.headers.cookie);
  return req.session.userId;
};

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError("You must be signed in.");
  }
};

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError("You are already signed in.");
  }
};

export const signOut = async (req, res) => {
  await Session.deleteOne({ "session.userId": req.session.userId });
  return new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);
      res.clearCookie(SESSION_NAME);
      resolve(true);
    });
  });
};
