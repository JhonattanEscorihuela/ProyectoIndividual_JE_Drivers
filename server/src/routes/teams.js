let { Router } = require("express");
let teamController = require('../controllers/teamController');
let teamsRouter = Router();


teamsRouter.get("/", teamController.getAllTeams);

module.exports = teamsRouter;