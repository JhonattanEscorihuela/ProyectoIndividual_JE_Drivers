let { Router } = require("express");
const driverController = require("../controllers/driverController");
let driversRouter = Router();

driversRouter.get("/", driverController.getAllDrivers);
driversRouter.get("/:idDriver", driverController.getDriverById);
driversRouter.get("/name.forename", driverController.getDriverById);
driversRouter.post('/', driverController.postDrivers);

module.exports = driversRouter;


