import { gql } from "apollo-server-express";

export default gql`
	extend type Mutation {
		createPost(body: String): Post 
	}
	extend type Query {
		getPosts(limit: Int, skip: Int): [Post] @auth
	}

	type Post {
		id: ID!
		body: String!
	}
`;
