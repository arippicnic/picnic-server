import { Post } from "../../models";

export default {
	Query: {
		getPosts: async (root, {limit = 1, skip = 0 }, {req}, info) => {
			console.log("from getpost query:", req);
			const posts = await Post.find({}, null, { limit, skip });
			return posts;
		}
	},
	Mutation: {
		createPost: async (root, args, info) => {
			const { body } = args;
			const post = await Post.create({ body });
			return post;
		}
	}
};
