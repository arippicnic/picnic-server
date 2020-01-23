import "@babel/polyfill/noConflict";

import setupDb from "./setup/db";
import server from "./server";

const { NODE_ENV, PORT, APP_PORT } = process.env;
const port = PORT || APP_PORT;

server.listen({ port }, async (error) => {
    if (error) {
      return console.error(error)
    } else {
      await setupDb();
      return console.info(`Server running on http://localhost:${ port } [${ NODE_ENV }]`)
    }
  })