import express from "express";

import setupModules from "./setup/load-modules";
import setupSession from "./setup/session-store";
import setupGraph from "./setup/graphql";
import routes from "./routes";

const app = express();
const { CLIENT_ADDR } = process.env;

setupModules(app);

setupSession(app);

setupGraph(app);

app.use("/api", routes);

app.get('*', (req, res) => res.redirect(CLIENT_ADDR));

export { app as default };