require("module-alias/register");
var express = require("express");

import { Express } from "express";

import { InitializeRoutes } from "./initRoutes";

import { serverConfig } from "../configs/serverConfig";
import { InitializeMiddleWare } from "./initMiddleware";
import { initializeWS } from "./initWs";

export async function server() {
  let app: Express = express();

  let host = serverConfig.host;
  let port = serverConfig.port;

  const httpServer = app.listen(port, host, () => {
    console.log(`Server  started listening at ${host} on ${port} port ! `);
  });
  await InitializeMiddleWare.InitializeCommonMiddleware(app);
  await InitializeRoutes.init(app);
  initializeWS(httpServer);
  return Promise.resolve(app);
}
