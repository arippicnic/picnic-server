import { ApolloServer } from "apollo-server-express";

import typeDefs from "../graphql/typeDefs";
import resolvers from "../graphql/resolvers";
import schemaDirectives from "../directives";

const { NODE_ENV, CLIENT_ADDR } = process.env;

export default app => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		schemaDirectives,
		context: ({ req, res }) => ({ req, res })
	});

	const corsOptions = {
		origin: CLIENT_ADDR,
		methods: ["GET", "POST"],
		credentials: true
	};

	server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });
};
