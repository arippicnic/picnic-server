import mongoose from "mongoose";

import { User } from "../../models";
import { attmeptSignIn, signOut } from "../../middlewares/auth";

const { SESSION_NAME, NODE_ENV } = process.env;

export default {
	Query: {
		me: async (root, args, { req }, info) => {
			console.log("from me resolver:", req.session.userId)
			const res = await User.findById(req.session.userId);
			return res;
		}
	},
	Mutation: {
		signUp: async (root, args, { req }, info) => {
			const user = await User.create(args);
			req.session.userId = user.id;
			req.session.save();
			return user;
		},
		signIn: async (root, args, { req, res }, info) => {
			const { email, password } = args;
			const user = await attmeptSignIn(email, password);
			req.session.userId = user.id;
			res.cookie(SESSION_NAME, user.id, {
				signed: true,
				httpOnly: true,
				secure: false
			});
			req.session.save();
			return user;
		},
		signOut: (root, args, { req, res }, info) => {
			return signOut(req, res);
		}
	}
};
