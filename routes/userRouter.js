const express= require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users" , userController.getUsers);
router.get('/users/create' , userController.redirectCreateUser)
router.post("/users" , userController.createUser);
router.get("/users/:id" , userController.getUser);
router.get("/users/update/:id" , userController.redirectUpdateUser);
router.post('/users/update/:id' , userController.updateUser);
router.get('/users/delete/:id' , userController.deleteUser);

module.exports = router;