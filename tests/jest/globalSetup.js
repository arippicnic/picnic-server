import "@babel/polyfill/noConflict";

import server from "../../src/server";

export default async () => {
	global.httpServer = await server.listen({ port: 4000 });
};
