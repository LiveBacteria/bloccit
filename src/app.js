const express = require("express");
const app = express();

module.exports = app;

const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config");

appConfig.init(app, express);
routeConfig.init(app);