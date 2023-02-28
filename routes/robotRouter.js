const express= require("express");
const router = express.Router();
const robotController = require("../controllers/robotController");

router.get('/robots/create' , robotController.redirectCreateRobot);
router.get("/robots" , robotController.getRobots);
router.post("/robots" , robotController.createRobot);
router.get("/robots/:id" , robotController.getRobotById);
router.get("/robots/:name" , robotController.getRobotByName);
router.get("/robots/update/:id" , robotController.redirectUpdateRobot);
router.post('/robots/update/:id' , robotController.updateRobot);
router.get('/robots/delete/:id' , robotController.deleteRobot);

module.exports = router;