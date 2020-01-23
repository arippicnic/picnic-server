import express from "express";

import setupModules from "./setup/load-modules";
import setupSession from "./setup/session-store";
import setupGraph from "./setup/graphql";
import routes from "./routes";

const app = express();

setupModules(app);

setupSession(app);

setupGraph(app);

app.use("/api", routes);

export { app as default };