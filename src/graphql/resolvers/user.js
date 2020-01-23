import mongoose from "mongoose";

import { User } from "../../models";
import { attmeptSignIn, signOut } from "../../middlewares/auth";

export default {
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
			res.cookie("SESSION_NAME", user.id, {
				//env
				signed: true,
				httpOnly: true,
				secure: false //env
			});
			// console.log(req.session.userId);
			req.session.save();
			return user;
		},
		signOut: (root, args, { req, res }, info) => {
			return signOut(req, res);
		}
	}
};
