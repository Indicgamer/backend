const express = require('express');
const { registerController, LoginController } = require('../controller/authController');
const getAllController = require('../controller/getAllUserController');
const deleteAllController = require('../controller/deleteAllUserController');


const router = express.Router();

router.post('/register', registerController);
router.post('/login', LoginController);
router.get("/getall",getAllController);
router.delete("/deleteall",deleteAllController);



module.exports = router;



