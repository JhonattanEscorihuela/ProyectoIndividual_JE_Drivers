const { Router } = require("express");

const MainRouter = Router();

let driversRouter = require("./drivers");
let teamsRouter = require('./teams.js');

MainRouter.use("/drivers", driversRouter);
MainRouter.use("/teams", teamsRouter);

module.exports = MainRouter;
